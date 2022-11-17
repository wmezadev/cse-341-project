import express, { Router } from 'express';

import { PostController } from '../controllers/post';

export const postRoutes: Router = express.Router();

postRoutes.get('/post', PostController.index);
postRoutes.post('/post', PostController.create);
