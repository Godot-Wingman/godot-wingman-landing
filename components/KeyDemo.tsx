"use client";
/**
 * The demo: pressing 1, 2 or 3 (or clicking the keys) shows one step of a real session,
 * the request, the tool calls with their results, and the picture the tools returned.
 * All steps stay in the page, stacked in the same place, and fade into each other, so
 * nothing jumps when the step changes. Pictures sit in one 16:9 frame.
 */
import { useEffect, useState } from "react";
import { DEMO_STEPS } from "@/lib/content";

export function KeyDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const index = DEMO_STEPS.findIndex((demoStep) => demoStep.key === event.key);
      if (index !== -1) setActiveIndex(index);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="demo">
      <div className="demo__stage">
        <div className="demo__chats">
          {DEMO_STEPS.map((step, index) => (
            <div
              key={step.key}
              className="demo__chat"
              data-active={index === activeIndex}
              aria-hidden={index !== activeIndex}
            >
              <p className="demo__prompt">
                <span className="demo__you">You</span>
                {step.prompt}
              </p>
              <ol className="demo__calls">
                {step.calls.map((call) => (
                  <li key={`${call.tool}-${call.input}`} className="demo__call">
                    <code className="demo__tool">{call.tool}</code>
                    <code className="demo__input">{call.input}</code>
                    <code className="demo__result">→ {call.result}</code>
                  </li>
                ))}
              </ol>
              <p className="demo__more">+ {step.moreCalls} more calls in this step</p>
            </div>
          ))}
        </div>
        <div className="demo__frame">
          {DEMO_STEPS.map((step, index) => (
            // biome-ignore lint/performance/noImgElement: static export, images are served as they are.
            <img
              key={step.key}
              src={step.image}
              alt={step.imageAlt}
              data-active={index === activeIndex}
              aria-hidden={index !== activeIndex}
            />
          ))}
        </div>
      </div>
      <div className="demo__keys" role="tablist" aria-label="Demo steps">
        {DEMO_STEPS.map((step, index) => (
          <button
            key={step.key}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className="keycap"
            onClick={() => setActiveIndex(index)}
          >
            <span className="keycap__key">{step.key}</span>
            <span className="keycap__label">{step.prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
