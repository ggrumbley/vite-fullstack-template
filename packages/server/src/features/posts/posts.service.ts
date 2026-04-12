import * as postsRepo from '../../db/repositories/posts.repository.ts';
import type { CreatePostInput, UpdatePostInput } from '../../db/types.ts';
import { createAppError, ERROR_CODE } from '../../lib/appError.ts';

export const getAllPosts = () => postsRepo.getAllPosts();

export const getPostById = async (id: number) => {
  const post = await postsRepo.getPostById(id);
  if (!post) throw createAppError(ERROR_CODE.NOT_FOUND, `Post ${id} not found`);

  return post;
};

export const createPost = (data: CreatePostInput) => postsRepo.createPost(data);

export const updatePost = async (id: number, data: UpdatePostInput) => {
  const post = await postsRepo.updatePost(id, data);
  if (!post) throw createAppError(ERROR_CODE.NOT_FOUND, `Post ${id} not found`);

  return post;
};

export const deletePost = async (id: number) => {
  const post = await postsRepo.deletePost(id);
  if (!post) throw createAppError(ERROR_CODE.NOT_FOUND, `Post ${id} not found`);

  return post;
};
