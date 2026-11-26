<p align="center">
  <img src="docs/logo.png" alt="Godot Wingman logo: a W with two wings" width="96">
</p>

<h1 align="center">Godot Wingman website</h1>

<p align="center">
  The landing page of <a href="https://github.com/Godot-Wingman/godot-wingman">Godot Wingman</a>, live at
  <a href="https://godot-wingman.pages.dev"><b>godot-wingman.pages.dev</b></a>.
</p>

<p align="center">
  <a href="https://github.com/Godot-Wingman/godot-wingman-landing/actions/workflows/deploy.yml"><img alt="Deploy" src="https://github.com/Godot-Wingman/godot-wingman-landing/actions/workflows/deploy.yml/badge.svg"></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs">
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare-Pages-f38020?style=flat-square&logo=cloudflare&logoColor=white">
  <img alt="No tracking" src="https://img.shields.io/badge/tracking-none-2ea043?style=flat-square">
</p>

Next.js exported as static files: no server, no cookies, no tracking.

## Run it

```sh
bun install
bun run dev      # http://localhost:3000
bun run lint     # Biome
bun run build    # static site in out/
```

## Publishing

Every push to `main` builds the site and uploads it to Cloudflare Pages
([deploy workflow](.github/workflows/deploy.yml)). It needs the repository secret `CLOUDFLARE_API_TOKEN`
(Cloudflare Pages: Edit) and the repository variable `CLOUDFLARE_ACCOUNT_ID`.
`bun run deploy` does the same from a computer logged in with `bunx wrangler login`.

## Rules for the content

- Every statement on the page must match the [Godot Wingman README](https://github.com/Godot-Wingman/godot-wingman#readme).
- The screenshots in `public/images` are real: they were taken through Godot Wingman's own tools.

## License and credits

The site code is under the [GNU AGPL-3.0](LICENSE), like Godot Wingman. The logos and game art below belong to their owners and keep their own terms.

- Wing shape: "Feathered wing" by Lorc, [game-icons.net](https://game-icons.net), CC BY 3.0.
- Game art in the screenshots: [Pixel Platformer](https://kenney.nl/assets/pixel-platformer) by Kenney, CC0.
- App logos: from their makers and [Simple Icons](https://simpleicons.org).
- Godot logo: from the [Godot press kit](https://godotengine.org/press/), used only to stand for Godot.
