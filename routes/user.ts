import express, { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

export const userRoutes: Router = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);
userRoutes.get('/logout', UserController.logout);
