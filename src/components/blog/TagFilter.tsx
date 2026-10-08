import { useLayoutEffect, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RuleFigure } from '../RuleFigure';
import { TagLink } from './TagLink';
import { link, mono, row } from '@/lib/face';
import {
  selectedTagsFromSearch,
  tagsInFirstSeenOrder,
  visiblePosts,
  type PostSummary,
} from '@/lib/posts';

const blogHead = 'pt-14 pb-8';
const pageLabel = 'mt-0 mb-0 text-[15px] font-normal';
const pills = `mt-4 flex flex-wrap items-center gap-2 text-[13px] leading-none ${mono}`;
const pill =
  'h-auto min-h-0 min-w-0 rounded-full border border-[#DCDBD6] bg-transparent px-3 py-2 text-[13px] font-normal text-[#222222] shadow-none hover:bg-transparent hover:text-[#222222] focus-visible:ring-0 data-[state=on]:border-[#222222] data-[state=on]:bg-[#222222] data-[state=on]:text-[#F2F2F0] aria-pressed:border-[#222222] aria-pressed:bg-[#222222] aria-pressed:text-[#F2F2F0] dark:border-[#262624] dark:text-[#E6E4DF] dark:hover:bg-transparent dark:hover:text-[#E6E4DF] dark:data-[state=on]:border-[#E6E4DF] dark:data-[state=on]:bg-[#E6E4DF] dark:data-[state=on]:text-black dark:aria-pressed:border-[#E6E4DF] dark:aria-pressed:bg-[#E6E4DF] dark:aria-pressed:text-black';
const blogList = 'pt-4 pb-8';
const byline = 'flex flex-wrap gap-3 text-[13px] leading-[1.6]';

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
