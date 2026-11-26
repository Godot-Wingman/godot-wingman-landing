/**
 * Facts shown on the page, kept in one place so they are easy to check against the
 * Godot Wingman README. Only verified statements belong here.
 */
import { siClaude, siGithubcopilot, siOpenai } from "simple-icons";

export const VERSION = "0.4.3";
export const REPOSITORY_URL = "https://github.com/Godot-Wingman/godot-wingman";
export const INSTALL_GUIDE_URL = `${REPOSITORY_URL}/blob/main/docs/INSTALL.md`;
export const CHANGELOG_URL = `${REPOSITORY_URL}/blob/main/CHANGELOG.md`;

/**
 * How an app's icon is drawn, in its own colors: a full official tile (an image file in
 * public/logos), an official symbol on a dark tile, or a one-color symbol (from Simple
 * Icons) on a tile of the app's color.
 */
export type AppLogo =
  | { kind: "tile-image"; src: string }
  | { kind: "symbol-image"; src: string }
  | { kind: "symbol-path"; path: string; color: string; tileColor?: string };

export interface AiApp {
  name: string;
  logo: AppLogo;
}

/** The Godot logo (from the Godot press kit), used only to stand for Godot. */
export const GODOT_LOGO: AppLogo = { kind: "symbol-image", src: "/logos/godot.svg" };

/** The AI apps the installer sets up (and GitHub Copilot in VS Code, set up per project). */
export const AI_APPS: AiApp[] = [
  { name: "Claude Code", logo: { kind: "symbol-path", path: siClaude.path, color: "#D97757" } },
  { name: "Claude Desktop", logo: { kind: "symbol-path", path: siClaude.path, color: "#D97757" } },
  // The Codex app's own tile: the OpenAI symbol on its blue (#3143FF in the app's manifest).
  {
    name: "Codex",
    logo: { kind: "symbol-path", path: siOpenai.path, color: "#FFFFFF", tileColor: "#3143FF" },
  },
  { name: "Cursor", logo: { kind: "tile-image", src: "/logos/cursor.svg" } },
  { name: "Gemini CLI", logo: { kind: "symbol-image", src: "/logos/gemini.svg" } },
  { name: "Windsurf", logo: { kind: "tile-image", src: "/logos/windsurf.svg" } },
  { name: "GitHub Copilot", logo: { kind: "symbol-path", path: siGithubcopilot.path, color: "#FFFFFF" } },
];

/** Things to ask for, shown in the moving strip under the hero. */
export const EXAMPLE_REQUESTS = [
  "Make the player jump higher",
  "Add a pause menu",
  "Why does the game crash at level 2?",
  "Play the level and tell me if it's too hard",
  "Add a health bar to the HUD",
  "Make the enemies patrol between two points",
  "Paint grass on the top of the ground",
  "Add a sound when a coin is collected",
  "Export the game for the web",
];

export interface Toolset {
  name: string;
  count: number;
  summary: string;
}

/** From the server's list_toolsets answer (121 tools in 20 toolsets). */
export const TOOLSETS: Toolset[] = [
  {
    name: "core",
    count: 16,
    summary:
      "Status, opening projects, toolset switching, editor GDScript, logs, editor screenshots, Godot docs. Always on.",
  },
  {
    name: "scene",
    count: 12,
    summary:
      "Open, create and save scenes; add, delete, duplicate, move, rename and select nodes; batch edits.",
  },
  {
    name: "inspector",
    count: 4,
    summary: "Read and change node properties and groups, with undo.",
  },
  {
    name: "script",
    count: 5,
    summary: "Create, read, edit, check and attach GDScript and C# scripts, checked by Godot's parser.",
  },
  {
    name: "project",
    count: 10,
    summary: "Project settings, input map, autoloads and editor plugins.",
  },
  {
    name: "signals",
    count: 3,
    summary: "List, connect and disconnect signals between nodes.",
  },
  {
    name: "resources",
    count: 3,
    summary: "Materials, collision shapes, gradients, themes, label settings and .tres files.",
  },
  {
    name: "filesystem",
    count: 11,
    summary: "List, read, write, search, move and delete project files; dependencies; reimport.",
  },
  {
    name: "viewport",
    count: 2,
    summary: "Switch between 2D, 3D and Script, and render the scene from any angle.",
  },
  {
    name: "play",
    count: 8,
    summary: "Run, stop and pause the game, step frames, change speed, wait until something happens.",
  },
  {
    name: "input",
    count: 6,
    summary: "Keys, actions, gamepad buttons, clicks, drags, typing and timed sequences.",
  },
  {
    name: "game_inspect",
    count: 8,
    summary: "Screenshots, frame series, live node tree and values, method calls inside the running game.",
  },
  {
    name: "debug",
    count: 2,
    summary: "The running game's output and errors with stack traces, and performance numbers.",
  },
  {
    name: "animation",
    count: 8,
    summary: "AnimationPlayer tracks and keys, pose preview and AnimationTree state machines.",
  },
  {
    name: "tilemap",
    count: 5,
    summary: "TileSets from tile sheets, placing and erasing tiles, terrain painting, levels as text.",
  },
  {
    name: "ui",
    count: 4,
    summary: "Control trees in one step, anchor presets, theme overrides and a layout check.",
  },
  {
    name: "3d",
    count: 5,
    summary: "Primitive meshes, sky and sun presets, collision for models, aiming cameras and lights.",
  },
  {
    name: "shader",
    count: 3,
    summary: "Write .gdshader files with compile errors, read uniforms, set ShaderMaterial values.",
  },
  {
    name: "audio",
    count: 3,
    summary: "Audio buses and effects, and sound file details.",
  },
  {
    name: "export",
    count: 3,
    summary: "Export presets, template check and building the game for each platform.",
  },
];

export const INSTALL_COMMANDS = {
  windows: {
    label: "Windows",
    shell: "PowerShell",
    command:
      "irm https://raw.githubusercontent.com/Godot-Wingman/godot-wingman/main/install/install.ps1 | iex",
    place: "Installs to %LOCALAPPDATA%\\Programs\\godot-wingman and adds it to your PATH.",
  },
  unix: {
    label: "macOS and Linux",
    shell: "Terminal",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Godot-Wingman/godot-wingman/main/install/install.sh | sh",
    place: "Installs to ~/.local/bin/godot-wingman.",
  },
} as const;

export interface DemoCall {
  tool: string;
  input: string;
  result: string;
}

export interface DemoStep {
  key: string;
  prompt: string;
  calls: DemoCall[];
  /** How many more calls of the same kind ran in this step (not listed). */
  moreCalls: number;
  image: string;
  imageAlt: string;
}

/**
 * A real session building a small platformer with Kenney's Pixel Platformer art (CC0):
 * these calls ran against the editor and returned these results and pictures.
 */
export const DEMO_STEPS: DemoStep[] = [
  {
    key: "1",
    prompt: "Build a level with the Kenney tiles in art/.",
    calls: [
      {
        tool: "create_scene",
        input: '{"path": "res://main.tscn"}',
        result: '{"created": "res://main.tscn"}',
      },
      {
        tool: "create_tileset",
        input: '{"texture": "res://art/tiles.png", "tile_size": [18, 18], "collision": true}',
        result: '{"tiles": 180, "assigned_to": "Ground"}',
      },
      { tool: "set_tiles", input: '{"node_path": "Ground", "rectangles": [...]}', result: '{"placed": 372}' },
      { tool: "take_editor_screenshot", input: '{"view": "2d"}', result: "2d view, 1490x932" },
    ],
    moreCalls: 11,
    image: "/images/level.png",
    imageAlt:
      "The level in the Godot editor: grass and dirt ground with a gap, floating platforms, trees and clouds (cropped from the screenshot).",
  },
  {
    key: "2",
    prompt: "Add a player that runs and jumps, coins and a score. Then play it.",
    calls: [
      {
        tool: "create_script",
        input: '{"path": "res://player.gd", "attach_to": "Player"}',
        result: '{"valid": true}',
      },
      {
        tool: "add_node",
        input: '{"type": "res://coin.tscn", "name": "Coin2"}',
        result: '{"added": "Coin2"}',
      },
      { tool: "run_game", input: "{}", result: '{"running": true, "scene": "main"}' },
      {
        tool: "input_sequence",
        input:
          '{"steps": [{"press": "action:move_right"}, {"wait_until": "…x > 286"}, {"tap": "action:jump"}]}',
        result:
          '{"performed": ["pressed action:move_right", "waited until … (2.26s)", "tapped action:jump"]}',
      },
    ],
    moreCalls: 32,
    image: "/images/game-coins.png",
    imageAlt:
      "The running game: the green character in the middle of a jump over a gap, the score shows 3 of 9 coins.",
  },
  {
    key: "3",
    prompt: "Let the player jump twice in the air.",
    calls: [
      {
        tool: "edit_script",
        input:
          '{"path": "res://player.gd", "old_text": "…and is_on_floor():", "new_text": "…and jumps_left > 0:"}',
        result: '{"valid": true}',
      },
      { tool: "validate_script", input: '{"path": "res://player.gd"}', result: '{"valid": true}' },
      { tool: "run_game", input: "{}", result: '{"running": true}' },
      {
        tool: "input_sequence",
        input:
          '{"steps": [{"press": "action:move_right"}, …, {"tap": "action:jump"}, {"wait_seconds": 0.32}, {"tap": "action:jump"}]}',
        result: '{"performed": ["tapped action:jump", "waited 0.32s", "tapped action:jump"]}',
      },
    ],
    moreCalls: 3,
    image: "/images/game-double-jump.png",
    imageAlt: "The running game: after two jumps the character is high above the platforms, next to a cloud.",
  },
];
