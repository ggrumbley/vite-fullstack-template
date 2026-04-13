import * as usersRepo from '../../db/repositories/users.repository.ts';
import type { CreateUserInput } from '../../db/types.ts';

export const getUsersWithPostCount = (page: number, pageSize: number) =>
  usersRepo.getUsersWithPostCount(page, pageSize);

export const createUser = (data: CreateUserInput) => usersRepo.createUser(data);

export const deleteUser = (id: number) => usersRepo.deleteUser(id);
