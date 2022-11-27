import express, { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

export const userRoutes: Router = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.get('/login', (req, res) => {
  userRoutes.post('/login', UserController.login);
  res.send(
    'Send username and password through POST method or use <a href="/auth/google">Authentication with Google</a>'
  );
});
userRoutes.post('/login', UserController.login);
userRoutes.get('/logout', UserController.logout);
userRoutes.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
userRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/post',
    failureRedirect: '/auth/google/failure'
  })
);
userRoutes.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});
