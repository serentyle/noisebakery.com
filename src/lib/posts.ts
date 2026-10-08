import { getCollection, type CollectionEntry } from 'astro:content';
import type { PublishedPost } from './blog';

function isPublished(post: CollectionEntry<'blog'>): post is PublishedPost {
  return post.data.draft !== true;
}

export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const posts = await getCollection('blog', isPublished);
  return posts.sort((a, b) => {
    const byDate = b.data.pubDate.getTime() - a.data.pubDate.getTime();
    if (byDate !== 0) return byDate;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}
