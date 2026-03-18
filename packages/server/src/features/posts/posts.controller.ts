import type { Request, Response } from 'express';

import { handler } from '../../lib/handler.ts';
import { HttpError } from '../../lib/errors.ts';
import { CreatePostDto, UpdatePostDto } from './posts.dto.ts';
import * as postService from './posts.service.ts';

export const getPosts = handler(async (_req: Request, res: Response) => {
  const data = await postService.getAllPosts();
  res.json(data);
});

export const getSinglePost = handler(async (req: Request, res: Response) => {
  const post = await postService.getPostById(Number(req.params.id));
  if (!post) throw new HttpError(404, 'Post not found');
  res.json(post);
});

export const createNewPost = handler(async (req: Request, res: Response) => {
  const body = CreatePostDto.parse(req.body);
  const post = await postService.createPost(body);
  res.status(201).json(post);
});

export const updateExistingPost = handler(async (req: Request, res: Response) => {
  const body = UpdatePostDto.parse(req.body);
  const updated = await postService.updatePost(Number(req.params.id), body);
  if (!updated) throw new HttpError(404, 'Post not found');
  res.json(updated);
});

export const deletePost = handler(async (req: Request, res: Response) => {
  const deleted = await postService.deletePost(Number(req.params.id));
  if (!deleted) throw new HttpError(404, 'Post not found');
  res.json({ message: 'Post deleted', deleted });
});
