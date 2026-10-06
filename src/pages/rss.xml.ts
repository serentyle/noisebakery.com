import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postPath } from '@/lib/blog';
import { siteDescription, siteName } from '@/lib/site';

export async function GET(context: APIContext) {
  const site = context.site;
  if (site === undefined) {
    throw new Error('site is unset');
  }
  const posts = await getPublishedPosts();
  return rss({
    title: siteName,
    description: siteDescription,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postPath(post.id),
    })),
  });
}
