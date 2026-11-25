import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Sort by `order` (lower first), then by date (newest first). */
function byOrderThenDate(a: Project, b: Project): number {
  return a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime();
}

/** All projects, sorted. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort(byOrderThenDate);
}

/** Projects split into finished and ongoing ones. */
export async function getProjectsByStatus() {
  const all = await getProjects();
  return {
    finished: all.filter((p) => p.data.status === 'completed'),
    ongoing: all.filter((p) => p.data.status === 'in-progress'),
  };
}

/** Every tag used by at least one project, sorted by how often it is used. */
export function collectTags(projects: Project[]): string[] {
  const count = new Map<string, number>();
  for (const p of projects) for (const t of p.data.tags) count.set(t, (count.get(t) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
}
