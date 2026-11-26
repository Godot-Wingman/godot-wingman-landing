"use client";
/**
 * Install: two wing-shaped panels, Windows on the left and macOS/Linux on the right, with
 * the W of the mark between them, so together they read as the logo. Each panel has its one-line command and a copy button.
 */
import { useState } from "react";
import { INSTALL_COMMANDS } from "@/lib/content";
import { LetterW, Wing } from "./WingMark";

type Platform = keyof typeof INSTALL_COMMANDS;

function CommandPanel({ platform, side }: { platform: Platform; side: "left" | "right" }) {
  const details = INSTALL_COMMANDS[platform];
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(details.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className={`feather feather--${side}`}>
      <Wing side={side} className="feather__wing" />
      <div className="feather__head">
        <h3>{details.label}</h3>
        <span className="feather__shell">{details.shell}</span>
      </div>
      <div className="feather__command">
        <code>{details.command}</code>
        <button type="button" onClick={copy} className="copy">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="feather__note">{details.place}</p>
    </div>
  );
}

export function Install() {
  return (
    <div className="wings">
      <CommandPanel platform="windows" side="left" />
      <LetterW className="wings__letter" />
      <CommandPanel platform="unix" side="right" />
    </div>
  );
}
