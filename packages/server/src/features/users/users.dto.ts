import { z } from 'zod';

export const CreateUserDto = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
});

export type CreateUserInput = z.infer<typeof CreateUserDto>;
