import { Router } from 'express';

import * as postController from '../controllers/post.controller.ts';

const router = Router();

// GET /api/posts - List all posts
router.get('/', postController.getPosts);

// GET /api/posts/:id - Get specific post
router.get('/:id', postController.getSinglePost);

// POST /api/posts - Create post
router.post('/', postController.createNewPost);

// PATCH /api/posts/:id - Update post (Partial update)
router.patch('/:id', postController.updateExistingPost);

// DELETE /api/posts/:id - Remove post
router.delete('/:id', postController.deletePost);

export default router;
