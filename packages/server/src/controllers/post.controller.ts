import type { Request, Response } from 'express';

import * as postService from '../services/post.service.ts';

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create new post';
    res.status(400).json({ error: message });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const data = await postService.getAllPosts();
    res.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch posts';
    res.status(500).json({ error: message });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    res.status(500).json({ error: message });
  }
};

export const updateExistingPost = async (req: Request, res: Response) => {
  try {
    const updated = await postService.updatePost(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Update failed';
    res.status(400).json({ error: message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await postService.deletePost(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted', deleted });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    res.status(500).json({ error: message });
  }
};
