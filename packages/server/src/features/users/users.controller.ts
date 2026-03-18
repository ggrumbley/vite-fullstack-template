import type { Request, Response } from 'express';

import { handler } from '../../lib/handler.ts';
import { CreateUserDto } from './users.dto.ts';
import * as userService from './users.service.ts';

export const getAllUsers = handler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const data = await userService.getUsersWithPostCount(page, limit);
  res.json(data);
});

export const createNewUser = handler(async (req: Request, res: Response) => {
  const body = CreateUserDto.parse(req.body);
  const user = await userService.createUser(body);
  res.status(201).json(user);
});
