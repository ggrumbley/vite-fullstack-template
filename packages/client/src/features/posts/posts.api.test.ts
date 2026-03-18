import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchPosts } from './posts.api.ts';

afterEach(() => vi.restoreAllMocks());

describe('fetchPosts', () => {
  it('returns parsed JSON on success', async () => {
    const mockPosts = [{ id: 1, title: 'Hello', content: 'World', author: 'Alice', createdAt: '' }];
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(mockPosts)));

    const result = await fetchPosts();

    expect(result).toEqual(mockPosts);
  });

  it('throws when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));

    await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts');
  });
});
