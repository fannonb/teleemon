"use client";

import { useCallback, useMemo, useState } from "react";

type Props = {
  url: string;
  title: string;
  /** Short line shown in Messages / WhatsApp / email */
  shareText?: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export function ShareCardButton({
  url,
  title,
  shareText = "Here's my digital business card — Teleemon Behavioral Health.",
  className = "",
  variant = "secondary",
}: Props) {
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);

  const fullMessage = useMemo(() => `${shareText}\n${url}`, [shareText, url]);

  const onShare = useCallback(async () => {
    setBusy(true);
    setHint("");

    try {
      const payload: ShareData = {
        title,
        text: shareText,
        url,
      };

      const canUseNativeShare =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        (typeof navigator.canShare !== "function" || navigator.canShare(payload));

      if (canUseNativeShare) {
        try {
          await navigator.share(payload);
          return;
        } catch (err) {
          // User cancelled the sheet — not an error
          if (err instanceof DOMException && err.name === "AbortError") return;
          // Some apps reject combined payload; retry with text-only (includes URL)
          try {
            await navigator.share({ title, text: fullMessage });
            return;
          } catch (err2) {
            if (err2 instanceof DOMException && err2.name === "AbortError") return;
          }
        }
      }

      // Desktop / unsupported browsers
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullMessage);
        setHint("Link copied. Paste it into a message, or use your browser Share menu.");
        return;
      }

      // Last resort: prompt
      window.prompt("Copy this link to forward the card:", url);
    } catch {
      setHint("Use your browser’s Share menu to send this card via text, WhatsApp, or email.");
    } finally {
      setBusy(false);
    }
  }, [fullMessage, shareText, title, url]);

  return (
    <div className={`card-share-wrap ${className}`.trim()}>
      <button
        type="button"
        className={variant === "primary" ? "card-forward-btn" : "card-share-btn"}
        onClick={onShare}
        disabled={busy}
        aria-label="Forward my card using your phone’s share menu"
      >
        {busy ? "Opening…" : "Forward My Card"}
      </button>
      {hint ? (
        <p className="card-share-hint" role="status">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
