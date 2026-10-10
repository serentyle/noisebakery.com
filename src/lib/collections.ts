import { getCollection, type CollectionEntry } from 'astro:content';
import type { PublishedArticle } from './types';

function isPublished(article: CollectionEntry<'blog'>): article is PublishedArticle {
  return article.data.draft !== true;
}

export async function getPublishedArticles(): Promise<PublishedArticle[]> {
  const articles = await getCollection('blog', isPublished);
  return articles.sort((a, b) => {
    const byDate = b.data.pubDate.getTime() - a.data.pubDate.getTime();
    if (byDate !== 0) return byDate;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}
