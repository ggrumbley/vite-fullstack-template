import { z } from 'zod';

export const GetUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.email('Must be a valid email address'),
  age: z.number().int().min(0).max(150),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
