"use client";

import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { getProjectDetails, getProjectModalCopy } from "../model/project-details";
import type { VisualProject } from "../model/projects";
import type { Locale } from "@/shared/lib/i18n/locale";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { motionStyle, motionTokens } from "@/shared/lib/motion/tokens";
import { trapDialogFocus } from "../model/trap-dialog-focus";

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ProjectModalProps = {
  locale: Locale;
  project: VisualProject;
  isOpen: boolean;
  onCloseAction: () => void;
  onExitedAction: () => void;
};

export const ProjectModal = ({ project, locale, isOpen, onCloseAction, onExitedAction }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exitCursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation[]>([]);
  const closeRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef("");
  const lockedRef = useRef(false);
  const transitionRef = useRef(0);
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);
  const detail = getProjectDetails(locale)[project.slug];
  const copy = getProjectModalCopy(locale);

  const animateDialog = useCallback((closing: boolean) => {
    const dialog = dialogRef.current;
    if (!dialog) return Promise.resolve();
    const reducedMotion = isMotionReduced();
    const computed = getComputedStyle(dialog);
    const currentOpacity = Number.parseFloat(computed.opacity) || 0;
    const transformMatch = computed.transform.match(/^matrix\(([^,]+),/);
    const currentScale = transformMatch ? Number.parseFloat(transformMatch[1]) : 1;
    const isInitialOpen = !closing && dialog.dataset.motionStarted !== "true";
    const startOpacity = isInitialOpen ? 0 : currentOpacity;
    const startScale = isInitialOpen ? 0.97 : currentScale;
    animationRef.current.forEach((animation) => animation.cancel());
    animationRef.current = [];
    dialog.dataset.motionStarted = "true";
    const animation = dialog.animate(
      closing
        ? [{ opacity: startOpacity, transform: `scale(${startScale})` }, { opacity: 0, transform: "scale(.97)" }]
        : [{ opacity: startOpacity, transform: `scale(${startScale})` }, { opacity: 1, transform: "scale(1)" }],
      { duration: reducedMotion ? 0 : (closing ? motionTokens.duration.exit : motionTokens.duration.modal), easing: motionTokens.easing.out, fill: "both" },
    );
    animationRef.current.push(animation);
    return animation.finished.then(() => { dialog.dataset.motionReady = "true"; }).catch(() => undefined);
  }, []);

  const close = useCallback(() => {
    if (closeRef.current || !isOpen) return;
    onCloseAction();
  }, [isOpen, onCloseAction]);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    transitionRef.current += 1;
    delete dialog.dataset.closing;
    if (!dialog.open) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      lockedRef.current = true;
      dialog.showModal();
    }
    closeRef.current = false;
    dialog.setAttribute("aria-modal", "true");
    dialog.focus({ preventScroll: true });
    void animateDialog(false);
  }, [animateDialog, isOpen, mounted]);

  useEffect(() => {
    if (!mounted || isOpen || !dialogRef.current?.open || closeRef.current) return;
    const dialog = dialogRef.current;
    const transition = ++transitionRef.current;
    closeRef.current = true;
    dialog.dataset.closing = "true";
    void animateDialog(true).then(() => {
      if (transition !== transitionRef.current || isOpen || !dialog.open) return;
      dialog.close();
      delete dialog.dataset.closing;
      animationRef.current = [];
      if (lockedRef.current) {
        document.body.style.overflow = previousOverflowRef.current;
        lockedRef.current = false;
      }
      previousFocusRef.current?.focus({ preventScroll: true });
      previousFocusRef.current = null;
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
      className="fixed inset-0 m-0 flex h-[100dvh] max-h-none w-screen max-w-none flex-col overflow-y-auto overscroll-contain rounded-none border-0 bg-white p-0 py-[clamp(24px,5vh,72px)] text-[#17241b] backdrop:bg-white backdrop:opacity-100 backdrop:transition-opacity backdrop:duration-(--motion-modal) backdrop:ease-(--motion-out) starting:backdrop:opacity-0 data-[closing=true]:backdrop:opacity-0 data-[closing=true]:backdrop:duration-(--motion-exit) site-still:backdrop:transition-none focus:outline-none"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <div ref={exitCursorRef} data-visible="false" className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#17241b] text-[28px] leading-none text-white opacity-0 data-[visible=true]:opacity-100">×</div>
      </div>
      <div data-project-dialog-content className="relative mx-auto my-auto flex w-full max-w-[1240px] shrink-0 cursor-auto flex-col gap-[23px] px-11 py-6 max-[900px]:gap-5 max-[900px]:px-7 max-[640px]:gap-4 max-[640px]:px-5 max-[640px]:py-4">
        <div className="sticky top-0 z-10 flex min-h-[45px] items-center justify-between gap-4 bg-white/95 py-2">
          <span className="font-[family-name:var(--font-visual-mono)] text-[13px] leading-[1.1] tracking-[.0182px] text-[#718076] max-[640px]:text-[10px]">{detail.eyebrow}</span>
          <div className="flex shrink-0 items-center gap-4 max-[640px]:gap-2">
          <LanguageSwitcher locale={locale} className="text-[#284634]" />
          <button
            type="button"
            onClick={close}
            aria-label={copy.closeAria}
            className="flex h-[35px] w-[177px] shrink-0 items-center justify-between rounded-full bg-[#eff3ef] px-[14px] font-[family-name:var(--font-visual-mono)] text-[12px] font-medium text-[#284634] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#284634] max-[640px]:w-auto max-[640px]:gap-3"
          >
            <span>{copy.close.toUpperCase()}</span><span aria-hidden="true" className="text-[20px] leading-none">×</span>
          </button>
          </div>
        </div>

        <h2 id="visual-project-title" className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(36px,5.3vw,76px)] leading-[1.04] font-semibold tracking-[-.029em] text-[#121b13]">
          {detail.title}
        </h2>
        <p id="visual-project-lead" className="font-[family-name:var(--font-visual-text)] text-[clamp(16px,1.53vw,22px)] leading-[1.34] tracking-[-.003em] text-[#4c5b50]">
          {detail.lead}
        </p>

        <div className="grid grid-cols-[minmax(0,682px)_minmax(0,550px)] items-center gap-9 max-[900px]:grid-cols-1 max-[900px]:gap-7">
          <Image
            src={detail.art}
            width={682}
            height={365}
            sizes="(max-width: 900px) 100vw, 682px"
            alt={`${copy.imageAlt} «${detail.title}» ${copy.imageAltSuffix}`}
            className="block h-auto w-full rounded-[17px]"
          />
          <div className="flex flex-col gap-[20px] text-[#344e3f] max-[900px]:gap-5">
            <div>
              <h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-[#779080]">{copy.task}</h3>
              <p className="font-[family-name:var(--font-visual-text)] text-[18px] leading-[1.31] tracking-[-.0018em] max-[640px]:text-[16px]">{detail.task}</p>
            </div>
            <div>
              <h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-[#779080]">{copy.contribution}</h3>
              <p className="font-[family-name:var(--font-visual-text)] text-[18px] leading-[1.31] tracking-[-.0018em] max-[640px]:text-[16px]">{detail.contribution}</p>
            </div>
            <div>
              <h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-[#779080]">{copy.technologies}</h3>
              <p className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.34] text-[#5d7967]">{detail.technologyLabel}</p>
            </div>
          </div>
        </div>

        <div className={`flex items-center justify-between gap-4 max-[760px]:flex-col max-[760px]:items-start ${detail.links.length ? "min-h-[41px]" : "min-h-[13px]"}`}>
          <div className="flex flex-wrap items-center gap-[17px]">
            {detail.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-[41px] w-[252px] items-center justify-start gap-4 rounded-full bg-[#e6f4de] px-[14px] font-[family-name:var(--font-visual-mono)] text-[12px] font-medium text-[#23573b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23573b]">
                {link.label}<span aria-hidden="true">↗</span>
              </a>
            ))}
            {detail.footnote && <span className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.07] text-[#718478]">{detail.footnote}</span>}
          </div>
          <span className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.05] text-[#849188] max-[640px]:text-[10px]">{copy.concept}</span>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};
