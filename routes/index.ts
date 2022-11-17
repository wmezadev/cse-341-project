import express, { Router } from 'express';
import { postRoutes } from './post';

export const routes: Router = express.Router();
routes.use(postRoutes);
