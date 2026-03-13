import { Router } from 'express';
import * as userController from '../controllers/user.controller.ts';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createNewUser);

export default router;
