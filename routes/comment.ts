import express, { Router } from 'express';
import { CommentController } from '../controllers/comment';

export const commentRoutes: Router = express.Router();

commentRoutes.get('/comment', CommentController.index);
commentRoutes.post('/comment', CommentController.store);
commentRoutes.get('/comment/getByPost/:post_id', CommentController.getByPost);
commentRoutes.get('/comment/:id', CommentController.show);
commentRoutes.put('/comment/:id', CommentController.udpate);
commentRoutes.delete('/comment/:id', CommentController.destroy);
