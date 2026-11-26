"use client";
/**
 * The thin top bar and the big WINGMAN word above the hero. While the first screen
 * scrolls, the big word shrinks and slides into the bar, onto the spot of the small name
 * (an invisible "slot" there gives its exact place and size).
 */
import { useEffect, useRef } from "react";
import { REPOSITORY_URL } from "@/lib/content";
import { LogoTile } from "./WingMark";

/** How many pixels of scrolling it takes for the word to reach the bar. */
const SHRINK_DISTANCE = 360;

export function Header() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const word = wordRef.current;
    const slot = slotRef.current;
    if (!word || !slot) return;
    let frame = 0;
    let endScale = 1;
    let endX = 0;
    let endY = 0;

    const measure = () => {
      word.style.transform = "none";
      const bigBox = word.getBoundingClientRect();
      const slotBox = slot.getBoundingClientRect();
      endScale = slotBox.height / bigBox.height;
      endX = slotBox.left - bigBox.left;
      endY = slotBox.top - bigBox.top;
    };
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / SHRINK_DISTANCE));
      // Ease out, so the word leaves quickly and settles softly in the bar.
      const eased = 1 - (1 - progress) ** 2;
      const scale = 1 + (endScale - 1) * eased;
      word.style.transform = `translate(${endX * eased}px, ${endY * eased}px) scale(${scale})`;
      document.documentElement.dataset.docked = progress >= 1 ? "true" : "false";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    document.fonts.ready.then(onResize);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <a className="topbar__home" href="#top" aria-label="Godot Wingman, back to the top">
            <LogoTile className="topbar__mark" />
            <span ref={slotRef} className="topbar__slot" aria-hidden="true">
              WINGMAN
            </span>
          </a>
          <nav className="topbar__links" aria-label="Main">
            <a href="#demo">Demo</a>
            <a href="#how">How it works</a>
            <a href="#install">Install</a>
            <a href="#docs">Docs</a>
            <a href={REPOSITORY_URL}>GitHub</a>
          </nav>
        </div>
      </header>
      <div className="bigword" aria-hidden="true">
        <span ref={wordRef} className="bigword__text">
          WINGMAN
        </span>
      </div>
    </>
  );
}
