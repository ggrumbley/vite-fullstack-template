import { z } from 'zod';

export const CreatePostDto = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.number().int().positive(),
});

export const UpdatePostDto = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export type CreatePostInput = z.infer<typeof CreatePostDto>;
export type UpdatePostInput = z.infer<typeof UpdatePostDto>;
