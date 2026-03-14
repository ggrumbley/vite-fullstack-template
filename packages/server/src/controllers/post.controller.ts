import type { Request, Response } from 'express';
import * as postService from '../services/post.service.ts';

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const data = await postService.getAllPosts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getSinglePost = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateExistingPost = async (req: Request, res: Response) => {
  try {
    const updated = await postService.updatePost(
      Number(req.params.id),
      req.body,
    );
    if (!updated) return res.status(404).json({ error: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await postService.deletePost(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
