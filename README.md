# Godot Wingman landing page

The website of [Godot Wingman](https://github.com/Albis0/godot-wingman), served by Cloudflare Pages at
https://godot-wingman.pages.dev. Next.js, exported as static files; no server, no tracking.

- `bun install`, then `bun run dev` and open http://localhost:3000
- `bun run build` writes the static site to `out/`
- `bun run deploy` builds and uploads it to Cloudflare Pages (needs `bunx wrangler login` once)

Every statement on the page must match the Godot Wingman README. The screenshots in `public/images` are real:
they were taken through Godot Wingman's own tools (`take_editor_screenshot`, `take_game_screenshot`).
The wing shape is "Feathered wing" by Lorc (game-icons.net, CC BY 3.0); app logos come from Simple Icons.
