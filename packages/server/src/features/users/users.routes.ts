import { Router } from 'express';

import { validate } from '../../lib/validate.ts';
import * as userController from './users.controller.ts';
import { CreateUserSchema, GetUsersQuerySchema } from './users.schemas.ts';

const router = Router();

router.get('/', validate(GetUsersQuerySchema, 'query'), userController.getAllUsers);
router.post('/', validate(CreateUserSchema), userController.createNewUser);

export default router;
