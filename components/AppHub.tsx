/**
 * "How it works" picture: the AI apps sit on an arc, each one connects to Godot Wingman
 * in the middle, and Godot Wingman connects to the Godot editor below. Logos are the apps'
 * own (from Simple Icons); the lines carry a slow flow toward the editor.
 */
import type { SimpleIcon } from "simple-icons";
import { AI_APPS, GODOT_LOGO } from "@/lib/content";
import { WingMark } from "./WingMark";

const WIDTH = 1000;
const HEIGHT = 640;
const HUB = { x: 500, y: 380 };
const GODOT = { x: 500, y: 578 };

function placeOnArc(index: number, count: number) {
  const startDegrees = 204;
  const endDegrees = 336;
  const degrees = startDegrees + ((endDegrees - startDegrees) * index) / (count - 1);
  const radians = (degrees * Math.PI) / 180;
  return {
    x: HUB.x + 410 * Math.cos(radians),
    y: HUB.y + 300 * Math.sin(radians),
  };
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

const percentX = (x: number) => `${(x / WIDTH) * 100}%`;
const percentY = (y: number) => `${(y / HEIGHT) * 100}%`;

export function AppHub() {
  const places = AI_APPS.map((_, index) => placeOnArc(index, AI_APPS.length));
  return (
    <figure
      className="hub"
      aria-label="Your AI apps connect to Godot Wingman, which connects to the Godot editor."
    >
      <svg className="hub__lines" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
        {places.map((place, index) => (
          <line
            key={AI_APPS[index]?.name}
            className="hub__line"
            x1={place.x}
            y1={place.y}
            x2={HUB.x}
            y2={HUB.y - 40}
            style={{ animationDelay: `${index * -0.37}s` }}
          />
        ))}
        <line
          className="hub__line hub__line--down"
          x1={HUB.x}
          y1={HUB.y + 44}
          x2={GODOT.x}
          y2={GODOT.y - 40}
        />
      </svg>

      {AI_APPS.map((app, index) => {
        const place = places[index] ?? HUB;
        return (
          <div
            key={app.name}
            className="hub__app"
            style={{ left: percentX(place.x), top: percentY(place.y) }}
          >
            <span className="hub__icon" style={{ "--brand": `#${app.icon.hex}` } as React.CSSProperties}>
              <BrandIcon icon={app.icon} />
            </span>
            <span className="hub__name">{app.name}</span>
          </div>
        );
      })}

      <div className="hub__center" style={{ left: percentX(HUB.x), top: percentY(HUB.y) }}>
        <WingMark className="hub__mark" />
        <span className="hub__center-name">Godot Wingman</span>
      </div>
      <span
        className="hub__tag hub__tag--mcp"
        style={{ left: percentX(HUB.x + 14), top: percentY(HUB.y - 92) }}
      >
        MCP · stdio
      </span>
      <span
        className="hub__tag hub__tag--socket"
        style={{ left: percentX(HUB.x + 14), top: percentY(HUB.y + 92) }}
      >
        WebSocket · 127.0.0.1 · token
      </span>

      <div className="hub__godot" style={{ left: percentX(GODOT.x), top: percentY(GODOT.y) }}>
        <span className="hub__icon hub__icon--godot">
          <BrandIcon icon={GODOT_LOGO} />
        </span>
        <span className="hub__name">Godot editor + addon</span>
      </div>
    </figure>
  );
}
