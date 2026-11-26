/**
 * The technical part, laid out like a rendered README (headings, tables, code blocks),
 * with a contents list beside it. Every statement matches the Godot Wingman README.
 */
import { CHANGELOG_URL, INSTALL_GUIDE_URL, REPOSITORY_URL, TOOLSETS } from "@/lib/content";

const CONTENTS = [
  ["what", "What it does"],
  ["toolsets", "Toolsets"],
  ["modes", "Permission modes"],
  ["chain", "How it connects"],
  ["languages", "Languages"],
  ["faq", "Questions"],
] as const;

export function Docs() {
  const toolCount = TOOLSETS.reduce((sum, toolset) => sum + toolset.count, 0);
  return (
    <div className="docs">
      <nav className="docs__contents" aria-label="On this page">
        <p className="docs__contents-title">README.md</p>
        <ul>
          {CONTENTS.map(([id, title]) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="md">
        <h2 id="what">What it does</h2>
        <p>
          Godot Wingman is an MCP server that runs on your computer, plus an addon for the Godot editor. Your
          AI app works inside the open editor, so it changes the real project you are looking at, and scene
          changes go through Godot's undo history.
        </p>
        <ul>
          <li>
            <strong>Sees</strong>: screenshots of the editor, the 2D and 3D viewport and the running game,
            with camera control.
          </li>
          <li>
            <strong>Builds</strong>: scenes, nodes, properties, signals, resources, animation, tile maps, UI,
            3D, shaders, audio and export presets.
          </li>
          <li>
            <strong>Plays</strong>: real input, holding keys, timing, sequences, frame stepping and waiting
            until a condition is true.
          </li>
          <li>
            <strong>Knows your Godot</strong>: the class reference of the Godot version you have installed,
            plus the classes of your GDExtensions and scripts.
          </li>
          <li>
            <strong>Works with other AIs</strong>: AIs connected to the same editor tell each other what they
            are changing, and you can write to all of them from the panel.
          </li>
        </ul>

        <h2 id="toolsets">Toolsets</h2>
        <p>
          {toolCount} tools in {TOOLSETS.length} toolsets. The AI turns on only the groups it needs (
          <code>list_toolsets</code>, <code>toggle_toolsets</code>), which keeps its context small.
        </p>
        <div className="md__table">
          <table>
            <thead>
              <tr>
                <th>Toolset</th>
                <th>Tools</th>
                <th>What it covers</th>
              </tr>
            </thead>
            <tbody>
              {TOOLSETS.map((toolset) => (
                <tr key={toolset.name}>
                  <td>
                    <code>{toolset.name}</code>
                  </td>
                  <td className="md__number">{toolset.count}</td>
                  <td>{toolset.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="modes">Permission modes</h2>
        <p>
          Pick a mode in the panel, or with <code>--mode</code> when you add Godot Wingman to your AI app.
          When the two differ, the stricter one wins.
        </p>
        <div className="md__table">
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Flag</th>
                <th>What the AI may do</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full</td>
                <td>
                  <code>--mode full</code> (default)
                </td>
                <td>Uses every enabled tool.</td>
              </tr>
              <tr>
                <td>Confirm each change</td>
                <td>
                  <code>--mode confirm</code>
                </td>
                <td>
                  Looks freely. Before every change Godot shows what it wants to do (for GDScript, the whole
                  code) and you click Allow or Deny.
                </td>
              </tr>
              <tr>
                <td>Read-only</td>
                <td>
                  <code>--mode read-only</code>
                </td>
                <td>
                  Only looks. Tools that change files, run GDScript, start the game or send input are hidden.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The panel lists every change and can put scripts, scenes, resources and settings back to how they
          were. When you press Ctrl+Z, change something by hand or go back, the AI is told with its next step:
        </p>
        <pre>
          <code>{`News from the Godot editor since your last tool call:
- The person undid "Move Coin3" (Ctrl+Z). It was your change.`}</code>
        </pre>

        <h2 id="chain">How it connects</h2>
        <pre>
          <code>{`Your AI app ──MCP (stdio)──▶ godot-wingman ──WebSocket, 127.0.0.1 + token──▶ Godot editor + addon
                                                                                  │ debugger
                                                                                  ▼
                                                                              your game`}</code>
        </pre>
        <p>
          The connection to the editor only listens on <code>127.0.0.1</code> and needs a secret token. Godot
          Wingman sends nothing about you or your project.
        </p>

        <h2 id="languages">Languages</h2>
        <ul>
          <li>
            <strong>GDScript</strong>: written, checked by Godot's own parser and attached. Fully supported.
          </li>
          <li>
            <strong>C#</strong>: with the .NET build of Godot, the AI writes and edits C# scripts; they are
            built with <code>dotnet build</code>.
          </li>
          <li>
            <strong>GDExtension</strong>: Rust and C++ classes from your extensions, with their properties,
            methods and signals.
          </li>
        </ul>
        <p>
          Requires Godot 4.5 or newer. Every change is tested with Godot 4.5.2, 4.6.3 and 4.7.2. Installing by
          hand: <a href={INSTALL_GUIDE_URL}>installation guide</a>.
        </p>

        <h2 id="faq">Questions</h2>
        <h3>Does Godot Wingman send my project anywhere?</h3>
        <p>
          No: no accounts, no cloud, no telemetry. To tell you about new versions it downloads the list of its
          releases from GitHub at most once a day (turn it off with <code>--no-update-check</code>). Your AI
          app is separate: what the AI reads goes to the AI model you use, under that provider's rules.
        </p>
        <h3>Can I sell a game I made with it?</h3>
        <p>
          Yes. The addon is an editor tool and is not included in exported games (a test checks this on every
          change). Your game's code and assets are yours, under any license you choose.
        </p>
        <h3>Is the code the AI writes for me under the AGPL?</h3>
        <p>
          No. The AGPL-3.0 covers Godot Wingman's own files: the server and the{" "}
          <code>addons/godot_wingman</code> folder. This is a summary, not legal advice.
        </p>
        <h3>How does it get updated?</h3>
        <p>
          When a new version is out, the AI tells you and installs it if you agree. The download is checked
          against the release's SHA-256 checksums. You can also run <code>godot-wingman update</code>. See the{" "}
          <a href={CHANGELOG_URL}>changelog</a> and the <a href={REPOSITORY_URL}>source</a>.
        </p>
      </article>
    </div>
  );
}
