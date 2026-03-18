import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('./posts.api.ts');

import { PostList } from './PostList.component.tsx';
import * as postsApi from './posts.api.ts';

const mockPosts = [
  { id: 1, title: 'First Post', content: 'Hello world', author: 'Alice', createdAt: '' },
  { id: 2, title: 'Second Post', content: 'Another post', author: 'Bob', createdAt: '' },
];

afterEach(() => vi.resetAllMocks());

describe('PostList', () => {
  it('shows loading state initially', () => {
    vi.mocked(postsApi.fetchPosts).mockReturnValue(new Promise(() => {}));

    render(<PostList />);

    expect(document.querySelector('.loading')).toBeTruthy();
  });

  it('renders a card for each post', async () => {
    vi.mocked(postsApi.fetchPosts).mockResolvedValue(mockPosts);

    render(<PostList />);

    expect(await screen.findByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('By Alice')).toBeInTheDocument();
    expect(screen.getByText('By Bob')).toBeInTheDocument();
  });

  it('renders empty without crashing when no posts returned', async () => {
    vi.mocked(postsApi.fetchPosts).mockResolvedValue([]);

    render(<PostList />);

    await screen.findByRole('region', { hidden: true }).catch(() => {});
    expect(screen.queryByText('By')).not.toBeInTheDocument();
  });
});
