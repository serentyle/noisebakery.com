import { useLayoutEffect, useState } from 'react';
import { RuleFigure } from '../RuleFigure';
import {
  selectedTagsFromSearch,
  tagListHref,
  tagsInFirstSeenOrder,
  visiblePosts,
  type PostSummary,
} from '../../lib/posts';

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

  function toggleTag(tag: string) {
    setSelected((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  return (
    <>
      <section className="blog-head">
        <h1>記事</h1>
        <div className="pills" role="group" aria-label="タグで絞り込む">
          <button
            type="button"
            className="pill"
            aria-pressed={selected.length === 0}
            onClick={() => setSelected((current) => (current.length === 0 ? current : []))}
          >
            すべて
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="pill"
              aria-pressed={selected.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {`#${tag}`}
            </button>
          ))}
        </div>
      </section>
      <RuleFigure kind="ruler" />
      <section className="blog-list">
        {visible.length === 0 ? (
          <p>該当する記事はありません。</p>
        ) : (
          visible.map((post) => (
            <div key={post.url} className="row">
              <a className="fg" href={post.url}>
                {post.title}
              </a>
              <div className="byline">
                <time dateTime={post.iso}>{post.date}</time>
                {post.tags.map((tag) => (
                  <a key={tag} className="tag" href={tagListHref(tag)}>
                    {`#${tag}`}
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
