import express, { Router } from 'express';
import { PostController } from '../controllers';
import { PostRequest } from '../requests';

export const postRoutes: Router = express.Router();

postRoutes.get('/post', PostController.index);
postRoutes.post('/post', PostRequest, PostController.store);
postRoutes.get('/post/:id', PostController.show);
postRoutes.put('/post/:id', PostController.update);
postRoutes.delete('/post/:id', PostController.destroy);
