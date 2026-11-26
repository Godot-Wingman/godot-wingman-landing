/**
 * The landing page: hero with a real editor screenshot, a strip of example requests, the key
 * demo, how the apps connect, install, and the README-style technical part.
 */
import { AppHub } from "@/components/AppHub";
import { Docs } from "@/components/Docs";
import { Header } from "@/components/Header";
import { Install } from "@/components/Install";
import { KeyDemo } from "@/components/KeyDemo";
import { EXAMPLE_REQUESTS, REPOSITORY_URL, VERSION } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero__spacer" aria-hidden="true" />
          <div className="wrap hero__text">
            <h1>
              Let your AI use the Godot editor.
              <span className="hero__second"> It builds, plays and fixes your game.</span>
            </h1>
            <p className="hero__lead">
              Godot Wingman is a free MCP server that runs on your computer. Your AI app sees the editor,
              builds scenes, writes and checks scripts, runs the game, plays it with real input, then reads
              the errors.
            </p>
            <div className="hero__actions">
              <a className="button button--solid" href="#install">
                Install
              </a>
              <a className="button" href={REPOSITORY_URL}>
                Source on GitHub
              </a>
              <span className="hero__meta">v{VERSION} · AGPL-3.0 · Godot 4.5+</span>
            </div>
          </div>
          <div className="wrap hero__shot">
            {/* biome-ignore lint/performance/noImgElement: static export, images are served as they are. */}
            <img
              src="/images/editor.png"
              width={1920}
              height={1057}
              alt="The Godot editor with a small platformer made with Kenney art, and the Godot Wingman panel at the bottom listing the script changes an AI made."
            />
            <p className="caption">
              A real screenshot: the Godot editor, and the Wingman panel listing what the AI did.
            </p>
          </div>
        </section>

        <div className="strip" aria-hidden="true">
          <div className="strip__track">
            {[...EXAMPLE_REQUESTS, ...EXAMPLE_REQUESTS].map((request, index) => (
              <span key={`${request}-${index < EXAMPLE_REQUESTS.length ? "a" : "b"}`}>“{request}”</span>
            ))}
          </div>
        </div>

        <section id="demo" className="section">
          <div className="wrap">
            <h2 className="title">
              Press 1, 2, 3.
              <span className="title__second"> A real session, step by step.</span>
            </h2>
            <KeyDemo />
          </div>
        </section>

        <section id="how" className="section">
          <div className="wrap how">
            <div className="how__text">
              <h2 className="title">
                One server between your AI and Godot.
                <span className="title__second"> Everything stays on your computer.</span>
              </h2>
              <ul className="how__facts">
                <li>
                  <strong>Your AI app starts it.</strong> It talks to Godot Wingman over MCP, like to any
                  other MCP server.
                </li>
                <li>
                  <strong>The addon opens the editor to it.</strong> Only on 127.0.0.1, and only with a secret
                  token.
                </li>
                <li>
                  <strong>Several AIs, one editor.</strong> They tell each other what they are changing.
                </li>
                <li>
                  <strong>Nothing leaves your computer.</strong> No accounts, no cloud, no telemetry.
                </li>
              </ul>
            </div>
            <AppHub />
          </div>
        </section>

        <section id="install" className="section">
          <div className="wrap">
            <h2 className="title">
              Install with one command.
              <span className="title__second"> Then restart your AI app.</span>
            </h2>
            <p className="section__lead">
              The installer downloads the newest release, checks its SHA-256 checksum and adds Godot Wingman
              to the AI apps it finds: Codex, Claude Desktop, Claude Code, Cursor, Gemini CLI and Windsurf.
            </p>
            <Install />
            <ol className="next-steps">
              <li>
                <strong>Run the command.</strong> A copy of every settings file it changes is kept next to it.
              </li>
              <li>
                <strong>Restart your AI app.</strong> It loads Godot Wingman when it starts.
              </li>
              <li>
                <strong>Ask for a game.</strong> “Create a new Godot game in C:/games/my-game”, or “Open my
                Godot project in D:/games/platformer”.
              </li>
            </ol>
          </div>
        </section>

        <section id="docs" className="section">
          <div className="wrap">
            <Docs />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <p>
            Godot Wingman is a community project. It is not made by, affiliated with or endorsed by the Godot
            Foundation or the Godot Engine project. “Godot” is a trademark of the Godot Foundation. App names
            and logos belong to their owners.
          </p>
          <p>
            Wing shape: “Feathered wing” by Lorc,{" "}
            <a href="https://game-icons.net/1x1/lorc/feathered-wing.html">game-icons.net</a>, CC BY 3.0. Game
            art: “Pixel Platformer” by Kenney, CC0. App logos come from their makers and Simple Icons. No
            tracking on this page.
          </p>
          <p>
            <a href={REPOSITORY_URL}>GitHub</a> · GNU AGPL-3.0
          </p>
        </div>
      </footer>
    </>
  );
}
