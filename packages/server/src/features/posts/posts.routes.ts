import { Router } from 'express';

import { validate } from '../../lib/validate.ts';
import * as postController from './posts.controller.ts';
import { CreatePostSchema, PostIdSchema, UpdatePostSchema } from './posts.schemas.ts';

const router = Router();

router.get('/', postController.getPosts);
router.get('/:id', validate(PostIdSchema, 'params'), postController.getSinglePost);
router.post('/', validate(CreatePostSchema), postController.createNewPost);
router.patch(
  '/:id',
  validate(PostIdSchema, 'params'),
  validate(UpdatePostSchema),
  postController.updateExistingPost,
);
router.delete('/:id', validate(PostIdSchema, 'params'), postController.deletePost);

export default router;
