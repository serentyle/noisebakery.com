import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { asTag, formatPostDate, tagLabel, tagListHref } from '../src/lib/post-summary.ts';

describe('post summary', () => {
  it('formats the Tokyo calendar day', () => {
    assert.equal(formatPostDate(new Date('2026-10-04T00:00:00Z')), '2026.10.04');
  });

  it('mints tags and rejects the empty string and the pill sentinel', () => {
    assert.equal(asTag(''), null);
    assert.equal(asTag('*'), null);
    const tag = asTag('サイト');
    assert.equal(tag, 'サイト');
    assert.ok(tag);
    assert.equal(tagLabel(tag), '#サイト');
    assert.equal(tagListHref(tag), '/blog/?tag=%E3%82%B5%E3%82%A4%E3%83%88');
  });
});
