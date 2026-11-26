"use client";
/**
 * The demo: pressing 1, 2 or 3 (or clicking the keys) shows one step of a real session,
 * the request, the tool calls with their results, and the picture the tools returned.
 */
import { useEffect, useState } from "react";
import { DEMO_STEPS } from "@/lib/content";

export function KeyDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = DEMO_STEPS[activeIndex] ?? DEMO_STEPS[0];

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

  if (!step) return null;
  return (
    <div className="demo">
      <div className="demo__stage">
        <div className="demo__chat" key={`chat-${step.key}`}>
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
        </div>
        <figure className="demo__picture" key={`picture-${step.key}`}>
          {/* biome-ignore lint/performance/noImgElement: static export, images are served as they are. */}
          <img src={step.image} alt={step.imageAlt} width={step.imageWidth} height={step.imageHeight} />
        </figure>
      </div>
      <div className="demo__keys" role="tablist" aria-label="Demo steps">
        {DEMO_STEPS.map((demoStep, index) => (
          <button
            key={demoStep.key}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className="keycap"
            onClick={() => setActiveIndex(index)}
          >
            <span className="keycap__key">{demoStep.key}</span>
            <span className="keycap__label">{demoStep.prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
