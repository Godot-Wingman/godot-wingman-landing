/**
 * The Godot Wingman mark: a drawn W with two wings growing from its top corners, and the
 * tile version (the mark on a rounded square, like an app icon).
 * The wing shape is "Feathered wing" by Lorc from game-icons.net (CC BY 3.0); the right
 * wing is the left one mirrored.
 */
const FEATHER_PATH =
  "M22.472 28.76c107.552 68.108 207.02 121.53 322.01 133.68 40.707 4.3 47.814 34.94 31.675 70.102-26.52 57.774 16.43 143.547 112.342 195.465-5.983 27.987-46.316 51.545-71.16 43.272-20.682-43.168-52.9-88.738-87.806-76.376-71.394 25.286-144.915 30.663-194.836 3.448 66.227-8.987 129.273-26.595 184.8-54.342C219.18 359.013 100.407 359.4 55.4 309.038c91.057 3.638 164.862-5.6 247.26-26.224C192.912 272.707 72.247 252.64 38.277 185.35c80.977 25.247 189.57 34.646 263.032 35.158C186.86 191.675 32.936 112.722 22.47 28.76z";

/** The W: outer strokes from the top corners, a shorter middle peak. */
const LETTER_PATH = "M106 170h62l36 128 34-106h36l34 106 36-128h62l-68 214h-54l-30-96-30 96h-54z";

/** The wing's shoulder (point 440, 300 of the wing drawing) sits on the W's top corner. */
const LEFT_WING = "translate(128 200) rotate(12) scale(0.56) translate(-440 -300)";
const RIGHT_WING = "translate(384 200) rotate(-12) scale(-0.56 0.56) translate(-440 -300)";

export function WingMark({ className }: { className?: string }) {
  return (
    <svg className={`wing-mark ${className ?? ""}`} viewBox="-125 -2 762 390" aria-hidden="true">
      <g className="wing-mark__wings">
        <path transform={LEFT_WING} d={FEATHER_PATH} />
        <path transform={RIGHT_WING} d={FEATHER_PATH} />
      </g>
      <path className="wing-mark__letter" d={LETTER_PATH} />
    </svg>
  );
}

/** The W of the mark alone (between the two install panels, which act as its wings). */
export function LetterW({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="100 164 312 226" aria-hidden="true">
      <path className="wing-mark__letter" d={LETTER_PATH} />
    </svg>
  );
}

/** The mark on a rounded square, like the app icons next to it. */
export function LogoTile({ className }: { className?: string }) {
  return (
    <span className={`logo-tile ${className ?? ""}`} aria-hidden="true">
      <WingMark />
    </span>
  );
}

/** One wing on its own, for decoration (the install panels). */
export function Wing({ side, className }: { side: "left" | "right"; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden="true"
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path fill="currentColor" d={FEATHER_PATH} />
    </svg>
  );
}
