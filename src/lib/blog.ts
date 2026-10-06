import { getCollection, type CollectionEntry } from 'astro:content';

export type PublishedPost = CollectionEntry<'blog'> & {
  data: CollectionEntry<'blog'>['data'] & { readonly draft: false };
};

function isPublished(post: CollectionEntry<'blog'>): post is PublishedPost {
  return post.data.draft !== true;
}

export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const posts = await getCollection('blog');
  return posts.filter(isPublished).sort((a, b) => {
    const byDate = b.data.pubDate.getTime() - a.data.pubDate.getTime();
    if (byDate !== 0) return byDate;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function postPath(id: string): string {
  const encoded = id
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `/blog/${encoded}/`;
}
