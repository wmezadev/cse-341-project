import express, { Router } from 'express';
import { postRoutes } from './post';
import { userRoutes } from './user';
import { commentRoutes } from './comment';
import { swaggerRoutes } from './swagger';

export const router: Router = express.Router();
router.use(postRoutes);
router.use(commentRoutes);
router.use(swaggerRoutes);
router.use(userRoutes);
