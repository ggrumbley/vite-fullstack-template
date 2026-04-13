import { z } from 'zod';

export const PostIdSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  userId: z.number().int().positive('userId must be a positive integer'),
});

export const UpdatePostSchema = z
  .object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: 'At least one field (title or content) must be provided',
  });

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;
