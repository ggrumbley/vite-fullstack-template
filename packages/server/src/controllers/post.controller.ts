import type { Request, Response } from 'express';

import { asyncHandler } from '../lib/asyncHandler.ts';
import * as postService from '../services/post.service.ts';

export const createNewPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.createPost(req.body);
  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (_req: Request, res: Response) => {
  const data = await postService.getAllPosts();
  res.json(data);
});

export const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
  const post = await postService.getPostById(Number(req.params.id));
  res.json(post);
});

export const updateExistingPost = asyncHandler(async (req: Request, res: Response) => {
  const updated = await postService.updatePost(Number(req.params.id), req.body);
  res.json(updated);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await postService.deletePost(Number(req.params.id));
  res.json({ message: 'Post deleted', deleted });
});
