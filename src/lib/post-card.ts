export type PostCard = {
  readonly title: string;
  readonly url: string;
  readonly pubDate: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export function tagListHref(tag: string): string {
  return `/blog/?tag=${encodeURIComponent(tag)}`;
}

export function selectedTagsFromSearch(search: string): string[] {
  const tags: string[] = [];
  for (const tag of new URLSearchParams(search).getAll('tag')) {
    if (tag.length > 0 && !tags.includes(tag)) tags.push(tag);
  }
  return tags;
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(iso));
}
