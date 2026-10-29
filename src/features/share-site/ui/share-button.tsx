"use client";

import { useState } from "react";
import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons";
import { Button } from "@/shared/ui/button";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";
import { getShareCopy } from "../model/copy";

export const ShareButton = (props: { locale?: Locale }) => {
  const {
    locale = "ru",
  } = props;

  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const copy = getShareCopy(locale);

  const share = async () => {
    const url = `${window.location.origin}${localizeHref("/", locale)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <Button
      onClick={share}
      type="button"
      aria-live="polite"
      className="h-13.5 gap-2 rounded-full bg-site-green px-8 text-site-on-green hover:bg-site-green"
    >
      {status === "copied"
        ? copy.copied
        : status === "error"
          ? copy.error
          : copy.idle}
      <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={24} color="currentColor" className="size-6" />
    </Button>
  );
};
