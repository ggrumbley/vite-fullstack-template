import type { Request, Response } from 'express';

import { asyncHandler } from '../../lib/asyncHandler.ts';
import * as userService from './users.service.ts';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const data = await userService.getUsersWithPostCount(page, limit);
  res.json(data);
});

export const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});
