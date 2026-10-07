import type { ReactNode } from 'react';
import { tagLabel, tagListHref, type PostSummary } from '@/lib/post-summary';

export type MetaLine = 'date' | 'date-and-tags';

const emptyCopy = {
  date: 'まだ記事がありません。',
  'date-and-tags': '該当する記事はありません。',
} as const;

export function PostMeta({ post, meta }: { post: PostSummary; meta: MetaLine }): ReactNode {
  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={post.iso}>{post.date}</time>
      {meta === 'date-and-tags'
        ? post.tags.map((tag) => (
            <a key={tag} href={tagListHref(tag)} className="ml-2">
              {tagLabel(tag)}
            </a>
          ))
        : null}
    </p>
  );
}

export function PostList({
  posts,
  meta,
}: {
  posts: readonly PostSummary[];
  meta: MetaLine;
}): ReactNode {
  if (posts.length === 0) return <p>{emptyCopy[meta]}</p>;
  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post) => (
        <li key={post.url}>
          <a href={post.url}>{post.title}</a>
          <PostMeta post={post} meta={meta} />
        </li>
      ))}
    </ul>
  );
}
