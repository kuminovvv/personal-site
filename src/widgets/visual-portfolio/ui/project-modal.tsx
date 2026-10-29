import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { Button } from "@/shared/ui/button";
import { createPortal } from "react-dom";
import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";
import { motionStyle, motionTokens } from "@/shared/lib/motion/tokens";
import { getProjectDetails, getProjectModalCopy } from "../model/project-details";
import type { ProjectModalProps } from "../model/project-modal-props";
import { trapDialogFocus } from "../model/trap-dialog-focus";
import { ProjectModalDetails } from "./project-modal-details";
import { ProjectModalHeader } from "./project-modal-header";
import { ProjectModalIntro } from "./project-modal-intro";
import { ProjectModalLinks } from "./project-modal-links";

import {getClientSnapshot, getServerSnapshot, subscribeToClient} from "../model/snapshots";



export const ProjectModal = (props: ProjectModalProps) => {
  const {
    project,
    locale,
    isOpen,
    onCloseAction,
    onExitedAction,
  } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exitCursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation[]>([]);
  const closeRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const closeScrollRef = useRef<{ left: number; top: number } | null>(null);
  const lockedRef = useRef(false);
  const transitionRef = useRef(0);
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);
  const detail = getProjectDetails(locale)[project.slug];
  const copy = getProjectModalCopy(locale);

  const animateDialog = useCallback((isClosing: boolean) => {
    const dialog = dialogRef.current;
    if (!dialog) return Promise.resolve();
    const reducedMotion = isMotionReduced();
    const computed = getComputedStyle(dialog);
    const currentOpacity = Number.parseFloat(computed.opacity) || 0;
    const transformMatch = computed.transform.match(/^matrix\(([^,]+),/);
    const currentScale = transformMatch ? Number.parseFloat(transformMatch[1]) : 1;
    const isInitialOpen = !isClosing && dialog.dataset.motionStarted !== "true";
    const startOpacity = isInitialOpen ? 0 : currentOpacity;
    const startScale = isInitialOpen ? 0.97 : currentScale;
    animationRef.current.forEach((animation) => animation.cancel());
    animationRef.current = [];
    dialog.dataset.motionStarted = "true";
    const animation = dialog.animate(
      isClosing
        ? [{ opacity: startOpacity, transform: `scale(${startScale})` }, { opacity: 0, transform: "scale(.97)" }]
        : [{ opacity: startOpacity, transform: `scale(${startScale})` }, { opacity: 1, transform: "scale(1)" }],
      { duration: reducedMotion ? 0 : (isClosing ? motionTokens.duration.exit : motionTokens.duration.modal), easing: motionTokens.easing.out, fill: "both" },
    );
    animationRef.current.push(animation);
    return animation.finished.then(() => { dialog.dataset.motionReady = "true"; }).catch(() => undefined);
  }, []);

  const close = useCallback(() => {
    if (closeRef.current || !isOpen) return;
    closeScrollRef.current = { left: window.scrollX, top: window.scrollY };
    onCloseAction();
  }, [isOpen, onCloseAction]);
  useEffect(() => {
    if (!mounted || !isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    transitionRef.current += 1;
    delete dialog.dataset.closing;
    if (!dialog.open) {
      // History navigation or a lazy import can move focus before this effect runs.
      previousFocusRef.current = document.querySelector<HTMLElement>(`[data-project-slug="${project.slug}"]`)
        ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      lockedRef.current = true;
      dialog.showModal();
    }
    closeRef.current = false;
    closeScrollRef.current = null;
    dialog.setAttribute("aria-modal", "true");
    dialog.focus({ preventScroll: true });
    void animateDialog(false);
  }, [animateDialog, isOpen, mounted, project.slug]);

  useEffect(() => {
    if (!mounted || isOpen || !dialogRef.current?.open || closeRef.current) return;
    const dialog = dialogRef.current;
    const transition = ++transitionRef.current;
    closeRef.current = true;
    dialog.dataset.closing = "true";
    void animateDialog(true).then(() => {
      if (transition !== transitionRef.current || isOpen || !dialog.open) return;
      const scrollPosition = closeScrollRef.current ?? { left: window.scrollX, top: window.scrollY };
      dialog.close();
      delete dialog.dataset.closing;
      animationRef.current = [];
      if (lockedRef.current) {
        document.body.style.overflow = previousOverflowRef.current;
        lockedRef.current = false;
      }
      previousFocusRef.current?.focus({ preventScroll: true });
      // Native dialog.close() may scroll to its automatically restored focus.
      window.scrollTo({ ...scrollPosition, behavior: "instant" });
      previousFocusRef.current = null;
      closeScrollRef.current = null;
      onExitedAction();
    });
  }, [animateDialog, isOpen, mounted, onExitedAction]);

  useEffect(() => {
      if (!mounted) return;
      const dialog = dialogRef.current;
      return () => {
      transitionRef.current += 1;
      animationRef.current.forEach((animation) => animation.cancel());
      if (dialog?.open) dialog.close();
      if (lockedRef.current) document.body.style.overflow = previousOverflowRef.current;
      lockedRef.current = false;
      previousFocusRef.current?.focus({ preventScroll: true });
      };
    }, [mounted]);

  useEffect(() => {
    const finish = () => {
      if (isMotionReduced()) animationRef.current.forEach((animation) => animation.finish());
    };
    return subscribeMotionPreference(finish);
  }, []);

  useEffect(() => {
    const resetExitCursor = () => {
      if (exitCursorRef.current) exitCursorRef.current.dataset.visible = "false";
      if (dialogRef.current) dialogRef.current.style.cursor = "";
    };
    window.addEventListener("blur", resetExitCursor);
    document.addEventListener("visibilitychange", resetExitCursor);
    return () => {
      window.removeEventListener("blur", resetExitCursor);
      document.removeEventListener("visibilitychange", resetExitCursor);
    };
  }, []);

  if (!detail || !mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      data-project-dialog="true"
      style={motionStyle}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="visual-project-title"
      aria-describedby="visual-project-lead"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onKeyDown={trapDialogFocus}
      onPointerMove={(event) => {
        const isOutside = event.pointerType === "mouse" && event.target === event.currentTarget;
        const cursor = exitCursorRef.current;
        if (!cursor) return;
        // The floating cross replaces the native pointer only over free space.
        event.currentTarget.style.cursor = isOutside ? "none" : "";
        cursor.dataset.visible = isOutside ? "true" : "false";
        if (isOutside) {
          cursor.style.left = `${event.clientX}px`;
          cursor.style.top = `${event.clientY}px`;
        }
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.cursor = "";
        if (exitCursorRef.current) exitCursorRef.current.dataset.visible = "false";
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 m-0 flex h-[100dvh] max-h-none w-screen max-w-none flex-col overflow-y-auto overscroll-contain rounded-none border-0 bg-white p-0 py-[clamp(24px,5vh,72px)] text-site-modal-border backdrop:bg-white backdrop:opacity-100 backdrop:transition-opacity backdrop:duration-(--motion-modal) backdrop:ease-(--motion-out) starting:backdrop:opacity-0 data-[closing=true]:backdrop:opacity-0 data-[closing=true]:backdrop:duration-(--motion-exit) site-still:backdrop:transition-none focus:outline-none"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <div ref={exitCursorRef} data-visible="false" className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-site-modal-border text-[28px] leading-none text-white opacity-0 data-[visible=true]:opacity-100">×</div>
      </div>
      <Button variant="unstyled" size="unstyled" type="button" onClick={close} aria-label={copy.closeAria} className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:right-4 focus-visible:z-50 focus-visible:bg-white focus-visible:p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-modal-text)]">
        {copy.close}
      </Button>
      <div data-project-dialog-content className="relative mx-auto my-auto flex w-full max-w-[1240px] shrink-0 cursor-auto flex-col gap-[23px] px-11 py-6 max-[900px]:gap-5 max-[900px]:px-7 max-[640px]:gap-4 max-[640px]:px-5 max-[640px]:py-4">
        <ProjectModalHeader detail={detail} locale={locale} />

        <ProjectModalIntro detail={detail} />

        <ProjectModalDetails detail={detail} copy={copy} />

        <ProjectModalLinks detail={detail} copy={copy}/>
      </div>
    </dialog>,
    document.body,
  );
};
