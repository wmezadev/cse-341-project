import express, { Router } from 'express';
import { PostController } from '../controllers/post';

export const postRoutes: Router = express.Router();

postRoutes.get('/post', PostController.index);
postRoutes.post('/post', PostController.store);
postRoutes.get('/post/:id', PostController.show);
postRoutes.put('/post/:id', PostController.update);
postRoutes.delete('/post/:id', PostController.destroy);
