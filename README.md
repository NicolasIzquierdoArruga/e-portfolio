# e-portfolio

Personal e-portfolio of **Nicolás Izquierdo Arruga**, FPGA and embedded hardware engineer.

Static site built with [Astro](https://astro.build), plain CSS, no tracking. Hosted on GitHub Pages:
<https://nicolasizquierdoarruga.github.io/e-portfolio/>

## Run it locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install        # once, installs Astro
npm run dev        # starts a local server at http://localhost:4321/e-portfolio/
```

The page reloads by itself when you save a file. Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the final site into `dist/` |
| `npm run preview` | Serves the built site from `dist/` to check it |
| `npm run check` | Checks types and the project frontmatter |

## Folder structure

```
astro.config.mjs            Site address (SITE_URL, BASE_PATH) and integrations
src/
  data/site.ts              Name, email, links, CV file names, navigation  <- edit your details here
  content.config.ts         The fields allowed in a project file (schema)
  content/projects/         One Markdown file per project  <- add projects here
    _template.md            Copy this to start a new project
  assets/                   Images, optimised by Astro at build time
    diagrams/               Block diagrams used on the project pages (SVG)
    profile.jpg             (add it) your photo, shown on the home page
  pages/                    One file per page; projects/[id].astro is the project template
  layouts/                  Page frames (head, header, footer)
  components/               Reusable pieces: project card, gallery, video, KiCad viewer...
  lib/                      Small helpers (links with the base path, project sorting)
  styles/global.css         Colours (light and dark), typography, shared styles
public/                     Files copied as they are: favicon, og.png, cv/, videos/, kicad/
.github/workflows/deploy.yml  Builds and publishes the site on every push to main
```

## Add a new project

1. Copy `src/content/projects/_template.md` to a new file in the same folder, for example
   `src/content/projects/uart-ip-core.md`. The file name becomes the page address:
   `/projects/uart-ip-core/`. Do not start the name with `_` (those files are ignored).
2. Fill in the frontmatter (the part between the `---` lines). The important fields:
   - `title`, `summary` (one line for the card), `context`, `period`, `date`
   - `status`: `completed` puts it under **Finished projects**, `in-progress` under **Ongoing projects**
   - `featured: true` shows a finished project on the home page (the first three by `order`)
   - `order`: lower numbers appear first
   - `tags`: used for the tag filter on the projects page
3. Write the page below the frontmatter in Markdown. Suggested sections: Overview, My role,
   Hardware, Firmware / software, Testing and results, Design decisions and lessons learned.
   Delete the ones that do not apply.
4. Run `npm run dev` and open the page. If a field is wrong, the terminal says which one.

### Add images

Put them in `src/assets/projects/<project-name>/`, then either:

- in the text: `![What the image shows](../../assets/projects/<project-name>/board.jpg)`
- in the gallery (click to enlarge), in the frontmatter:

  ```yaml
  gallery:
    - { src: '../../assets/projects/<project-name>/scope.png', alt: 'Scope capture of the trip', caption: '24.4 ns from threshold to shutdown' }
  ```

Always write a real `alt` text: it is read by screen readers. Astro resizes and compresses the
images when it builds the site.

### Videos and KiCad files

- **YouTube:** `videos: [{ title: 'Demo', youtube: 'VIDEO_ID' }]` (uses the privacy-enhanced youtube-nocookie domain).
- **MP4 file:** put it in `public/videos/` and use `videos: [{ title: 'Bench test', file: 'videos/bench.mp4' }]`.
  Keep files short and small (a few MB).
- **KiCad:** put the `.kicad_sch` or `.kicad_pcb` in `public/kicad/` and use
  `kicad: [{ title: 'Main board', file: 'kicad/board.kicad_pcb' }]`. It is shown with
  [KiCanvas](https://kicanvas.org), loaded only on that page.

### Code blocks

Use fenced code blocks with the language name, they are highlighted automatically:
` ```vhdl `, ` ```c `, ` ```matlab `, ` ```bash `.

## Edit your details

- Name, email, LinkedIn, GitHub, CV file names: `src/data/site.ts`.
- CV PDF: put it in `public/cv/` with the name listed in `public/cv/README.md`.
- Photo: add `src/assets/profile.jpg` (square works best). It appears on the home page automatically.
- Gaps still to fill are shown on the site in pink dashed boxes. Search for `<Placeholder` in `src/pages/`.

## Deploy

Deployment is automatic: every push to `main` runs `.github/workflows/deploy.yml`, which builds
the site with the official Astro action and publishes it on GitHub Pages.

**One-time setup:** in the repository on GitHub, go to **Settings → Pages** and set
**Source** to **GitHub Actions**.

The progress of each deployment is visible in the **Actions** tab.

## Add a custom domain later

1. Buy the domain (for example `nicolasizquierdo.dev`).
2. In `astro.config.mjs`, change the two values at the top:

   ```js
   const SITE_URL = 'https://nicolasizquierdo.dev';
   const BASE_PATH = '/';
   ```

   Every link in the site is built from these values, so nothing else changes.
3. Add a file `public/CNAME` containing only the domain: `nicolasizquierdo.dev`.
4. In **Settings → Pages → Custom domain**, enter the domain, then follow GitHub's
   instructions to add the DNS records at your domain provider. Tick **Enforce HTTPS** once
   it is available.

## Design choices

- **Static site, no backend, no cookies, no analytics.** Nothing to maintain or secure.
- **Content in Markdown.** Adding a project is one file plus its images; the schema in
  `src/content.config.ts` rejects mistakes at build time.
- **Plain CSS with variables.** Light and dark mode follow the system setting; the toggle
  button saves the choice in the browser only.
- **Very little JavaScript:** the theme toggle, the tag filter, the image enlarger and the
  menu on wide screens. The site still works without it.
- **Accessibility:** semantic HTML, alt text, a "skip to content" link, visible keyboard focus,
  colours chosen for readable contrast in both modes.
