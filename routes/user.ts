import express, { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

export const userRoutes: Router = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'authentication failed' });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, message: 'authentication succeded' });
    });
  })(req, res, next);
});
