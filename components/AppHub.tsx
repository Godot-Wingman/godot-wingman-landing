/**
 * "How it works" picture: the AI apps sit on an arc, each one connects to Godot Wingman
 * in the middle, and Godot Wingman connects to the Godot editor below. Every app is shown
 * with its own icon in its own colors; the lines carry a slow flow toward the editor.
 */
import { AI_APPS, type AppLogo, GODOT_LOGO } from "@/lib/content";
import { LogoTile } from "./WingMark";

const WIDTH = 1000;
const HEIGHT = 730;
const HUB = { x: 500, y: 450 };
const GODOT = { x: 500, y: 660 };

function placeOnArc(index: number, count: number) {
  const startDegrees = 198;
  const endDegrees = 342;
  const degrees = startDegrees + ((endDegrees - startDegrees) * index) / (count - 1);
  const radians = (degrees * Math.PI) / 180;
  return { x: HUB.x + 440 * Math.cos(radians), y: HUB.y + 370 * Math.sin(radians) };
}

export function AppIcon({ logo }: { logo: AppLogo }) {
  if (logo.kind === "tile-image") {
    return (
      <span className="app-icon app-icon--image">
        {/* biome-ignore lint/performance/noImgElement: static export, images are served as they are. */}
        <img src={logo.src} alt="" />
      </span>
    );
  }
  if (logo.kind === "symbol-image") {
    return (
      <span className="app-icon">
        {/* biome-ignore lint/performance/noImgElement: static export, images are served as they are. */}
        <img className="app-icon__symbol" src={logo.src} alt="" />
      </span>
    );
  }
  return (
    <span
      className="app-icon"
      style={logo.tileColor ? { background: logo.tileColor, borderColor: logo.tileColor } : undefined}
    >
      <svg className="app-icon__symbol" viewBox="0 0 24 24" aria-hidden="true">
        <path fill={logo.color} d={logo.path} />
      </svg>
    </span>
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
            y2={HUB.y}
            style={{ animationDelay: `${index * -0.37}s` }}
          />
        ))}
        <line className="hub__line hub__line--down" x1={HUB.x} y1={HUB.y} x2={GODOT.x} y2={GODOT.y} />
      </svg>

      {AI_APPS.map((app, index) => {
        const place = places[index] ?? HUB;
        return (
          <div
            key={app.name}
            className="hub__node"
            style={{ left: percentX(place.x), top: percentY(place.y) }}
          >
            <AppIcon logo={app.logo} />
            <span className="hub__name">{app.name}</span>
          </div>
        );
      })}

      <div className="hub__node hub__node--center" style={{ left: percentX(HUB.x), top: percentY(HUB.y) }}>
        <LogoTile className="hub__logo" />
        <span className="hub__name hub__name--strong">Godot Wingman</span>
      </div>

      <div className="hub__node" style={{ left: percentX(GODOT.x), top: percentY(GODOT.y) }}>
        <AppIcon logo={GODOT_LOGO} />
        <span className="hub__name">Godot editor + addon</span>
      </div>
    </figure>
  );
}
