import type { CollectionEntry } from 'astro:content';

export type PublishedPost = CollectionEntry<'blog'> & {
  data: CollectionEntry<'blog'>['data'] & { readonly draft: false };
};

export type PostSummary = {
  url: string;
  title: string;
  iso: string;
  date: string;
  tags: readonly string[];
};

export type Neighbor = {
  url: string;
  title: string;
  label: '前の記事' | '次の記事';
};

function datePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((part) => part.type === type)?.value ?? '';
}

export function formatPostDate(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));
  return `${datePart(parts, 'year')}.${datePart(parts, 'month')}.${datePart(parts, 'day')}`;
}

export function toPostSummary(post: PublishedPost): PostSummary {
  const iso = post.data.pubDate.toISOString();
  return {
    url: `/blog/${post.id}/`,
    title: post.data.title,
    iso,
    date: formatPostDate(iso),
    tags: post.data.tags,
  };
}

export function parseTagQuery(search: string): string[] {
  return [...new Set(new URLSearchParams(search).getAll('tag'))].filter(Boolean);
}

export function collectTags(posts: readonly PostSummary[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))];
}

export function filterPostsByTags(
  posts: readonly PostSummary[],
  tags: readonly string[],
): readonly PostSummary[] {
  if (tags.length === 0) return posts;
  const tagSet = new Set(tags);
  return posts.filter((post) => post.tags.some((tag) => tagSet.has(tag)));
}

export function neighborsOf(summaries: readonly PostSummary[], index: number): Neighbor[] {
  const neighbors: Neighbor[] = [];
  const older = summaries[index + 1];
  const newer = summaries[index - 1];
  if (older) neighbors.push({ url: older.url, title: older.title, label: '前の記事' });
  if (newer) neighbors.push({ url: newer.url, title: newer.title, label: '次の記事' });
  return neighbors;
}
