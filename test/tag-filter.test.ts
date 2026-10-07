import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { asTag, type PostSummary, type Tag } from '../src/lib/post-summary.ts';
import { applyPillValue, parseSelection, visiblePosts } from '../src/lib/tag-filter.ts';

function tag(raw: string): Tag {
  const minted = asTag(raw);
  assert.ok(minted);
  return minted;
}

function post(title: string, tags: readonly Tag[]): PostSummary {
  return {
    url: `/blog/${title}/`,
    title,
    iso: '2026-10-04T00:00:00.000Z',
    date: '2026.10.04',
    tags,
  };
}

describe('tag filter', () => {
  const diary = tag('日記');
  const site = tag('サイト');
  const known = [diary, site];
  const posts = [post('oven', [site]), post('hello', [diary, site]), post('other', [diary])];

  it('parses the query into a selection', () => {
    assert.deepEqual(parseSelection('?tag=日記&tag=日記&tag=', known), {
      kind: 'some',
      tags: [diary],
    });
    assert.deepEqual(parseSelection('?tag=missing', known), {
      kind: 'some',
      tags: [tag('missing')],
    });
    assert.deepEqual(parseSelection('', known), { kind: 'all' });
  });

  it('keeps an unknown tag selected and shows no posts', () => {
    const selection = parseSelection('?tag=missing', known);
    assert.deepEqual(visiblePosts(posts, selection), []);
  });

  it('matches any selected tag', () => {
    assert.deepEqual(
      visiblePosts(posts, { kind: 'some', tags: [diary, site] }).map((item) => item.title),
      ['oven', 'hello', 'other'],
    );
    assert.deepEqual(
      visiblePosts(posts, { kind: 'some', tags: [site] }).map((item) => item.title),
      ['oven', 'hello'],
    );
  });

  it('turns pill values into a selection', () => {
    assert.deepEqual(applyPillValue({ kind: 'all' }, [diary], known), {
      kind: 'some',
      tags: [diary],
    });
    assert.deepEqual(applyPillValue({ kind: 'some', tags: [diary, site] }, ['*', diary], known), {
      kind: 'all',
    });
    assert.deepEqual(applyPillValue({ kind: 'some', tags: [diary] }, [], known), {
      kind: 'all',
    });
  });
});
