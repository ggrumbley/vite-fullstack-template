import type { Request, Response } from 'express';
import type { z } from 'zod';

import { asyncHandler } from '../../lib/asyncHandler.ts';
import type { CreatePostInput, PostIdSchema, UpdatePostInput } from './posts.schemas.ts';
import * as postService from './posts.service.ts';

export const createNewPost = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreatePostInput;
  const post = await postService.createPost(body);
  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (_req: Request, res: Response) => {
  const data = await postService.getAllPosts();
  res.json(data);
});

export const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as z.infer<typeof PostIdSchema>;

  const post = await postService.getPostById(id);
  res.json(post);
});

export const updateExistingPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as z.infer<typeof PostIdSchema>;
  const body = req.body as UpdatePostInput;
  const updated = await postService.updatePost(id, body);
  res.json(updated);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await postService.deletePost(Number(req.params.id));
  res.json({ message: 'Post deleted', deleted });
});
