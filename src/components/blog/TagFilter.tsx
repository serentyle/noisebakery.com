import { useLayoutEffect, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RuleFigure } from '../RuleFigure';
import { TagLink } from './TagLink';
import { blogHead, blogList, byline, link, pageLabel, pill, pills, row } from '@/lib/face';
import {
  selectedTagsFromSearch,
  tagsInFirstSeenOrder,
  visiblePosts,
  type PostSummary,
} from '@/lib/posts';

type Props = {
  posts: readonly PostSummary[];
};

function sameTags(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((tag, index) => tag === b[index]);
}

export function TagFilter({ posts }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useLayoutEffect(() => {
    const sync = () => {
      const next = selectedTagsFromSearch(window.location.search);
      setSelected((current) => (sameTags(current, next) ? current : next));
    };
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, []);

  const tags = tagsInFirstSeenOrder(posts);
  const visible = visiblePosts(posts, selected);

  return (
    <>
      <section className={blogHead}>
        <h1 className={pageLabel}>記事</h1>
        <div className={pills} role="group" aria-label="タグで絞り込む">
          <Toggle
            pressed={selected.length === 0}
            onPressedChange={() => setSelected((current) => (current.length === 0 ? current : []))}
            className={pill}
          >
            すべて
          </Toggle>
          <ToggleGroup
            multiple
            value={selected}
            onValueChange={setSelected}
            spacing={2}
            className="w-fit flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <ToggleGroupItem key={tag} value={tag} className={pill}>
                {`#${tag}`}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </section>
      <RuleFigure kind="ruler" />
      <section className={blogList}>
        {visible.length === 0 ? (
          <p>該当する記事はありません。</p>
        ) : (
          visible.map((post) => (
            <div key={post.url} className={row}>
              <a className={link} href={post.url}>
                {post.title}
              </a>
              <div className={byline}>
                <time dateTime={post.iso}>{post.date}</time>
                {post.tags.map((tag) => (
                  <TagLink key={tag} tag={tag} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
