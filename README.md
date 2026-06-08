# Isabella Valdez — Astro Portfolio (Starter)

Overview
- This workspace contains a minimal Astro-based portfolio starter. It uses a single data source and two reusable components: `ProjectCard.astro` and `ProjectPage.astro`.

Key files to edit
- `src/content/projects/*.md`: Add or edit project Markdown files. Use frontmatter with `slug`, `title`, `projectUrl`, `short`, `category`, `role`, `tools`, `problem`, `process`, `solution`, `images`, and `reflection`. The Markdown body will render inside the universal `ProjectPage` layout. If an entry has no image, the site will use `/images/placeholder.svg` automatically.
- `src/components/ProjectCard.astro`: Controls how a project appears on the homepage. It now uses a window-style preview card and shows the live project link hostname.
- `src/components/ProjectPage.astro`: Universal case-study layout used for every project page, including a button to open the live project.
- `src/layouts/BaseLayout.astro`: Global page wrapper (header, footer, CSS include).

Image folders
- `public/images/headshots/`: put your portrait photos and personal photos here.
- `public/images/logos/`: put logo assets for headers, nav bars, or brand marks here.
- `public/images/backgrounds/`: put larger background or texture images here.
- `public/icons/`: put smaller icon or graphic assets here if you want separate icon files.
- `public/favicon.svg`: your logo can be used as the site favicon. Replace this file with your own SVG or PNG favicon.

Quick start
1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

How it works
- The homepage (`src/pages/index.astro`) now loads `src/content/projects/*.md` and renders a `ProjectCard` for each Markdown entry (reads frontmatter).
- Clicking a card opens `/projects/<slug>/`, which is handled by `src/pages/projects/[slug].astro`. The page finds the matching Markdown module and renders its frontmatter through `ProjectPage.astro`, injecting the Markdown body into the layout slot.
- To add a new project: create a Markdown file `src/content/projects/<slug>.md` with frontmatter fields and optional Markdown body. Place images in `public/images/` or use external URLs. If you omit `image` or `images`, the site will use `/images/placeholder.svg` as a fallback.

Important local preview note:
- If you open `index.html` directly or use Live Server on the repo root, you will see an old legacy page.
- Instead, run `npm install` and `npm run dev`, then open the URL shown in the terminal (usually `http://localhost:3000`).

Let me know if you want Markdown-driven project pages instead (one Markdown file per project), or automatic image processing.
# ValdezIzzy.github.io