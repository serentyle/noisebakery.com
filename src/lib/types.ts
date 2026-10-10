import type { CollectionEntry } from 'astro:content';

export type PublishedArticle = CollectionEntry<'blog'> & {
  data: CollectionEntry<'blog'>['data'] & { readonly draft: false };
};

export type ArticleSummary = {
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
