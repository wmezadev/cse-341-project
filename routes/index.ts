import express, { Router } from 'express';
import { postRoutes } from './post';
import { commentRoutes } from './comment';

export const routes: Router = express.Router();
routes.use(postRoutes);
routes.use(commentRoutes);
