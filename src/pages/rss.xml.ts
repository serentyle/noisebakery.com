import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles } from '@/lib/collections';
import { siteDescription, siteName } from '@/lib/site';

export async function GET(context: APIContext) {
  const site = context.site;
  if (site === undefined) {
    throw new Error('site is unset');
  }
  const articles = await getPublishedArticles();
  return rss({
    title: siteName,
    description: siteDescription,
    site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/blog/${article.id}/`,
    })),
  });
}
