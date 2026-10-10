import type { ArticleSummary, Neighbor, PublishedArticle } from './types';

function datePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((part) => part.type === type)?.value ?? '';
}

export function formatArticleDate(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));
  return `${datePart(parts, 'year')}.${datePart(parts, 'month')}.${datePart(parts, 'day')}`;
}

export function toArticleSummary(article: PublishedArticle): ArticleSummary {
  const iso = article.data.pubDate.toISOString();
  return {
    url: `/blog/${article.id}/`,
    title: article.data.title,
    iso,
    date: formatArticleDate(iso),
    tags: article.data.tags,
  };
}

export function parseTagQuery(search: string): string[] {
  return [...new Set(new URLSearchParams(search).getAll('tag'))].filter(Boolean);
}

export function collectTags(articles: readonly ArticleSummary[]): string[] {
  return [...new Set(articles.flatMap((article) => article.tags))];
}

export function filterArticlesByTags(
  articles: readonly ArticleSummary[],
  tags: readonly string[],
): readonly ArticleSummary[] {
  if (tags.length === 0) return articles;
  const tagSet = new Set(tags);
  return articles.filter((article) => article.tags.some((tag) => tagSet.has(tag)));
}

export function neighborsOf(summaries: readonly ArticleSummary[], index: number): Neighbor[] {
  const neighbors: Neighbor[] = [];
  const older = summaries[index + 1];
  const newer = summaries[index - 1];
  if (older) neighbors.push({ url: older.url, title: older.title, label: '前の記事' });
  if (newer) neighbors.push({ url: newer.url, title: newer.title, label: '次の記事' });
  return neighbors;
}
