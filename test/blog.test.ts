import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  asTag,
  latestSummaries,
  neighborsOf,
  toSummary,
  type PostSummary,
} from '../src/lib/post-summary.ts';

function source(id: string, iso: string, tags: readonly string[] = []) {
  return {
    id,
    data: {
      title: id,
      pubDate: new Date(iso),
      tags,
    },
  };
}

function summary(title: string): PostSummary {
  const tag = asTag('日記');
  assert.ok(tag);
  return {
    url: `/blog/${title}/`,
    title,
    iso: '2026-10-04T00:00:00.000Z',
    date: '2026.10.04',
    tags: [tag],
  };
}

describe('blog summaries', () => {
  it('keeps the first five in the given order', () => {
    const posts = [
      source('sixth-old', '2020-01-01T00:00:00Z'),
      source('first', '2026-10-05T00:00:00Z', ['サイト', '', '*']),
      source('second', '2026-01-02T00:00:00Z'),
      source('third', '2026-03-03T00:00:00Z'),
      source('fourth', '2026-04-04T00:00:00Z'),
      source('fifth', '2026-05-05T00:00:00Z'),
      source('dropped', '2026-12-31T00:00:00Z'),
    ];
    const latest = latestSummaries(posts);
    assert.deepEqual(
      latest.map((post) => post.title),
      ['sixth-old', 'first', 'second', 'third', 'fourth'],
    );
    assert.equal(latest[0]?.date, '2020.01.01');
    assert.equal(latest[1]?.date, '2026.10.05');
    assert.deepEqual(latest[1]?.tags, ['サイト']);
    assert.equal(latest[1]?.url, '/blog/first/');
  });

  it('formats a summary from the entry fields', () => {
    const post = toSummary(source('hello', '2026-10-04T00:00:00Z', ['日記']));
    assert.equal(post.date, '2026.10.04');
    assert.equal(post.iso, '2026-10-04T00:00:00.000Z');
    assert.equal(post.url, '/blog/hello/');
    assert.deepEqual(post.tags, ['日記']);
  });

  it('lists the older neighbor first', () => {
    const posts = [summary('newer'), summary('current'), summary('older')];
    assert.deepEqual(
      neighborsOf(posts, 1).map((neighbor) => [neighbor.post.title, neighbor.label]),
      [
        ['older', '前の記事'],
        ['newer', '次の記事'],
      ],
    );
    assert.deepEqual(
      neighborsOf(posts, 0).map((neighbor) => neighbor.label),
      ['前の記事'],
    );
    assert.equal(neighborsOf(posts, 0)[0]?.post.title, 'current');
    assert.deepEqual(
      neighborsOf(posts, 2).map((neighbor) => neighbor.label),
      ['次の記事'],
    );
    assert.equal(neighborsOf(posts, 2)[0]?.post.title, 'current');
  });
});
