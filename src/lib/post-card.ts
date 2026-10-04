export type PostCard = {
  readonly title: string;
  readonly url: string;
  readonly pubDate: string;
  readonly description: string;
  readonly tags: readonly string[];
};

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(iso));
}
