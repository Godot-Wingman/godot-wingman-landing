/**
 * Facts shown on the page, kept in one place so they are easy to check against the
 * Godot Wingman README. Only verified statements belong here.
 */
import {
  type SimpleIcon,
  siClaude,
  siCursor,
  siGithubcopilot,
  siGodotengine,
  siGooglegemini,
  siOpenai,
  siWindsurf,
} from "simple-icons";

export const VERSION = "0.4.1";
export const REPOSITORY_URL = "https://github.com/Albis0/godot-wingman";
export const INSTALL_GUIDE_URL = `${REPOSITORY_URL}/blob/main/docs/INSTALL.md`;
export const CHANGELOG_URL = `${REPOSITORY_URL}/blob/main/CHANGELOG.md`;

export const GODOT_LOGO: SimpleIcon = siGodotengine;

export interface AiApp {
  name: string;
  icon: SimpleIcon;
  /** How Godot Wingman gets added to the app. */
  setup: "installer" | "by hand";
}

/** The AI apps the installer sets up (and VS Code, which is set up per project). */
export const AI_APPS: AiApp[] = [
  { name: "Claude Code", icon: siClaude, setup: "installer" },
  { name: "Claude Desktop", icon: siClaude, setup: "installer" },
  { name: "Codex", icon: siOpenai, setup: "installer" },
  { name: "Cursor", icon: siCursor, setup: "installer" },
  { name: "Gemini CLI", icon: siGooglegemini, setup: "installer" },
  { name: "Windsurf", icon: siWindsurf, setup: "installer" },
  { name: "VS Code Copilot", icon: siGithubcopilot, setup: "by hand" },
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

/** Real tool names, for the moving strip under the hero. */
export const TOOL_NAMES = [
  "create_project",
  "take_editor_screenshot",
  "add_node",
  "set_properties",
  "create_script",
  "validate_script",
  "run_game",
  "input_sequence",
  "take_game_screenshot",
  "wait_until",
  "paint_terrain",
  "connect_signal",
  "render_view",
  "get_class_docs",
  "tell_other_ais",
  "step_frames",
  "capture_frames",
  "batch_edit",
  "set_input_action",
  "create_tileset",
];

export const INSTALL_COMMANDS = {
  windows: {
    label: "Windows",
    shell: "PowerShell",
    command: "irm https://raw.githubusercontent.com/Albis0/godot-wingman/main/install/install.ps1 | iex",
    place: "Installs to %LOCALAPPDATA%\\Programs\\godot-wingman and adds it to your PATH.",
  },
  unix: {
    label: "macOS and Linux",
    shell: "Terminal",
    command: "curl -fsSL https://raw.githubusercontent.com/Albis0/godot-wingman/main/install/install.sh | sh",
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
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

/** A real session: these calls ran against the editor and returned these results and images. */
export const DEMO_STEPS: DemoStep[] = [
  {
    key: "1",
    prompt: "Show me the level.",
    calls: [
      {
        tool: "set_main_screen",
        input: '{"screen": "2D"}',
        result: '{"main_screen": "2D"}',
      },
      {
        tool: "take_editor_screenshot",
        input: '{"view": "2d"}',
        result: "2d view, 1490x748",
      },
    ],
    image: "/images/level.png",
    imageAlt:
      "The level of a small platformer rendered by the Godot editor: two ground blocks with a gap, floating platforms and coins.",
    imageWidth: 1490,
    imageHeight: 748,
  },
  {
    key: "2",
    prompt: "Put three coins over the gap and make the camera follow the player.",
    calls: [
      {
        tool: "add_node",
        input:
          '{"type": "Camera2D", "parent_path": "Player", "properties": {"zoom": [3, 3], "position_smoothing_enabled": true}}',
        result: '{"added": "Player/Camera2D"}',
      },
      {
        tool: "duplicate_node",
        input: '{"node_path": "Coin6", "new_name": "Coin7"}',
        result: '{"duplicate": "Coin7"}',
      },
      {
        tool: "set_properties",
        input: '{"node_path": "Coin7", "properties": {"position": [312, 284]}}',
        result: '{"changed": {"position": "Vector2(312, 284)"}}',
      },
      {
        tool: "save_scene",
        input: "{}",
        result: '{"saved": "res://main.tscn"}',
      },
      {
        tool: "take_editor_screenshot",
        input: '{"view": "2d"}',
        result: "2d view, 1490x762",
      },
    ],
    image: "/images/level-coins.png",
    imageAlt: "The same level after the change, with three new coins in an arc over the gap.",
    imageWidth: 1490,
    imageHeight: 762,
  },
  {
    key: "3",
    prompt: "Play it and jump over the gap.",
    calls: [
      {
        tool: "run_game",
        input: "{}",
        result: '{"running": true, "scene": "main"}',
      },
      {
        tool: "input_sequence",
        input:
          '{"steps": [{"press": "action:move_right"}, {"wait_until": "node(\\"Player\\").position.x > 286"}, {"tap": "action:jump"}, {"wait_seconds": 0.22}]}',
        result:
          '{"performed": ["pressed action:move_right", "waited until node(\\"Player\\").position.x > 286 (2.07s)", "tapped action:jump", "waited 0.22s"]}',
      },
      {
        tool: "take_game_screenshot",
        input: "{}",
        result: "Game view 1280x720",
      },
    ],
    image: "/images/game-jump.png",
    imageAlt:
      "The running game in the middle of the jump over the gap, with the counter showing 3 of 9 coins.",
    imageWidth: 1280,
    imageHeight: 720,
  },
];
