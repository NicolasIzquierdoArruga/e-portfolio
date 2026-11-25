/**
 * Build an internal link that works both on GitHub Pages (where the site lives
 * under /e-portfolio/) and on a custom domain (where it lives at /).
 *
 *   url('/projects')       -> '/e-portfolio/projects'
 *   url('cv/cv-fpga.pdf')  -> '/e-portfolio/cv/cv-fpga.pdf'
 *
 * Always use this helper for links to pages and to files in /public.
 * External links (https://...) are returned unchanged.
 */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '/e-portfolio'
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}

/** True when `current` (a pathname) is the page `href` or one of its children. */
export function isActive(current: string, href: string): boolean {
  const strip = (p: string) => p.replace(/\/$/, '') || '/';
  const a = strip(current);
  const b = strip(url(href));
  if (b === strip(url('/'))) return a === b;
  return a === b || a.startsWith(b + '/');
}
