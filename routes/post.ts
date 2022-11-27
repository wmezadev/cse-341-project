import express, { Request, Response, NextFunction, Router } from 'express';
import { PostController } from '../controllers';
import { PostRequest } from '../requests';

export const postRoutes: Router = express.Router();

export const UserValidation = (req: Request, res: Response, next: NextFunction) => {
  return req.user ? next() : res.status(401).send('Error');
};

postRoutes.get('/post', UserValidation, PostController.index);
postRoutes.post('/post', PostRequest, PostController.store);
postRoutes.get('/post/:id', PostController.show);
postRoutes.put('/post/:id', PostController.update);
postRoutes.delete('/post/:id', PostController.destroy);
