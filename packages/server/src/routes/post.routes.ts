import { Router } from 'express';
import * as postController from '../controllers/post.controller.ts';

const router = Router();

// Endpoint: POST /api/posts
router.post('/', postController.createNewPost);

// You can add more later, e.g.
// router.get('/:id', postController.getPostById);
// router.delete('/:id', postController.deletePostById);

export default router;
