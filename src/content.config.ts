/**
 * Content collections.
 *
 * Every file in src/content/projects/ becomes one project page at
 * /projects/<file-name>/ and one card on the projects list.
 * Files whose name starts with "_" (like _template.mdx) are ignored.
 *
 * The schema below checks the frontmatter of each project at build time,
 * so a typo in a field name or a missing image stops the build with a clear
 * error instead of publishing a broken page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line, shown on the project card and as the meta description. */
      summary: z.string(),
      /** Where the work was done, e.g. "Internship · Indra". */
      context: z.string(),
      /** Display period, e.g. "Apr 2026 – Aug 2026". */
      period: z.string(),
      /** Used to sort projects (newest first) when `order` is equal. */
      date: z.coerce.date(),
      status: z.enum(['completed', 'in-progress']).default('completed'),
      tags: z.array(z.string()).default([]),
      /** Featured projects appear on the home page. */
      featured: z.boolean().default(false),
      /** Lower number = shown first. */
      order: z.number().default(100),

      /** Card thumbnail and page header image (optional). */
      thumbnail: image().optional(),
      thumbnailAlt: z.string().optional(),

      /** Short highlighted facts shown at the top of the page. */
      keyFacts: z.array(z.object({ value: z.string(), label: z.string() })).default([]),

      /** A note shown in a box at the top, e.g. a confidentiality notice. */
      notice: z.string().optional(),

      /** Links: code repository, documentation, demo video... */
      links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),

      /** Image gallery with click-to-enlarge (photos, schematics, PCB, scope captures). */
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),

      /** Videos: a YouTube video id, or a path to an MP4 file in /public. */
      videos: z
        .array(
          z.object({
            title: z.string(),
            youtube: z.string().optional(),
            file: z.string().optional(),
          }),
        )
        .default([]),

      /** KiCad files in /public shown with KiCanvas (.kicad_sch or .kicad_pcb). */
      kicad: z.array(z.object({ title: z.string(), file: z.string() })).default([]),
    }),
});

export const collections = { projects };
