import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  parseTagQuery,
  collectTags,
  filterPostsByTags,
  type PostSummary,
} from '@/lib/blog';
import { useLayoutEffect, useState } from 'react';
import { RuleFigure } from '../RuleFigure';
import { TagLink } from './TagLink';

const pill =
  'h-auto min-h-0 min-w-0 rounded-full border border-border bg-transparent px-3 py-2 text-meta leading-none font-normal text-foreground shadow-none hover:bg-transparent hover:text-foreground focus-visible:ring-0 data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background';

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
      const next = parseTagQuery(window.location.search);
      setSelected((current) => (sameTags(current, next) ? current : next));
    };
    sync();
    document.addEventListener('astro:page-load', sync);
    return () => document.removeEventListener('astro:page-load', sync);
  }, []);

  const tags = collectTags(posts);
  const visible = filterPostsByTags(posts, selected);

  return (
    <>
      <section className="pt-14 pb-8">
        <h1 className="mt-0 mb-0 text-label font-normal">記事</h1>
        <div
          className="mt-4 flex flex-wrap items-center gap-2 text-meta leading-none font-mono"
          role="group"
          aria-label="タグで絞り込む"
        >
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
              <ToggleGroupItem
                key={tag}
                value={tag}
                className={pill}
              >
                {`#${tag}`}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </section>
      <RuleFigure kind="ruler" />
      <section className="pt-4 pb-8">
        {visible.length === 0 ? (
          <p>該当する記事はありません。</p>
        ) : (
          visible.map((post) => (
            <div key={post.url} className="py-2.5">
              <a className="text-foreground link" href={post.url}>
                {post.title}
              </a>
              <div className="flex flex-wrap gap-3 text-meta">
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
