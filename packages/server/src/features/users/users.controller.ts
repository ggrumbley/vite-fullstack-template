import type { Request, Response } from 'express';
import type { z } from 'zod';

import { asyncHandler } from '../../lib/asyncHandler.ts';
import type { CreateUserInput, GetUsersQuerySchema } from './users.schemas.ts';
import * as userService from './users.service.ts';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = req.query as unknown as z.infer<typeof GetUsersQuerySchema>;

  const data = await userService.getUsersWithPostCount(page, limit);
  res.json(data);
});

export const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateUserInput;
  const user = await userService.createUser(body);
  res.status(201).json(user);
});
