export type Tag = string & { readonly __brand: 'Tag' };

export const PILL_SENTINEL = '*';

export type PostSummary = {
  readonly url: string;
  readonly title: string;
  readonly iso: string;
  readonly date: string;
  readonly tags: readonly Tag[];
};

const tokyoDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function asTag(raw: string): Tag | null {
  if (raw === '' || raw === PILL_SENTINEL) return null;
  return raw as Tag;
}

export function formatPostDate(date: Date): string {
  const parts = tokyoDate.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  return `${year}.${month}.${day}`;
}

export function tagLabel(tag: Tag): string {
  return `#${tag}`;
}

export function tagListHref(tag: Tag): string {
  return `/blog/?tag=${encodeURIComponent(tag)}`;
}

export function postPath(id: string): string {
  const encoded = id
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `/blog/${encoded}/`;
}

type SummarySource = {
  readonly id: string;
  readonly data: {
    readonly title: string;
    readonly pubDate: Date;
    readonly tags: readonly string[];
  };
};

export function toSummary(post: SummarySource): PostSummary {
  const tags: Tag[] = [];
  for (const raw of post.data.tags) {
    const tag = asTag(raw);
    if (tag !== null && !tags.includes(tag)) tags.push(tag);
  }
  return {
    url: postPath(post.id),
    title: post.data.title,
    iso: post.data.pubDate.toISOString(),
    date: formatPostDate(post.data.pubDate),
    tags,
  };
}

const HOME_LIMIT = 5;

export function latestSummaries(posts: readonly SummarySource[]): readonly PostSummary[] {
  return posts.slice(0, HOME_LIMIT).map(toSummary);
}

export type Neighbor = {
  readonly post: PostSummary;
  readonly label: '前の記事' | '次の記事';
};

export function neighborsOf(
  summaries: readonly PostSummary[],
  index: number,
): readonly Neighbor[] {
  const neighbors: Neighbor[] = [];
  const older = summaries[index + 1];
  const newer = summaries[index - 1];
  if (older !== undefined) neighbors.push({ post: older, label: '前の記事' });
  if (newer !== undefined) neighbors.push({ post: newer, label: '次の記事' });
  return neighbors;
}
