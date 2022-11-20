import express, { Router } from 'express';
import { CommentController } from '../controllers';
import { CommentStoreRequest, CommentUpdateRequest } from '../requests';

export const commentRoutes: Router = express.Router();

commentRoutes.get('/comment', CommentController.index);
commentRoutes.post('/comment', CommentStoreRequest, CommentController.store);
commentRoutes.get('/comment/getByPost/:post_id', CommentController.getByPost);
commentRoutes.get('/comment/:id', CommentController.show);
commentRoutes.put('/comment/:id', CommentController.udpate);
commentRoutes.put('/comment/:id', CommentUpdateRequest, CommentController.udpate);
commentRoutes.delete('/comment/:id', CommentController.destroy);
