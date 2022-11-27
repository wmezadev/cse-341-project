import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username, password }), password, async (err, account) => {
      if (err) {
        return res.json({ error: err.message });
      }
      await passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({ username });
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.logout({ keepSessionInfo: false }, () => {});
      return res.status(401).json({ success: false, message: 'authentication failed' });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, message: 'authentication succeded' });
    });
  })(req, res, next);
};

const logout = (req: Request, res: Response) => {
  req.logout({ keepSessionInfo: false }, () => {});
  res.redirect('/login');
};

const oauthGoogleLogin = () => {
  return passport.authenticate('google', { scope: ['email', 'profile'] });
};

const oauthGoogleCallback = () => {
  return passport.authenticate('google', {
    successRedirect: '/post',
    failureRedirect: '/auth/google/failure'
  });
};

const oauthGoogleCallbackFailure = (req: Request, res: Response) => {
  res.send('Failed to authenticate..');
};

export const UserController = {
  register,
  login,
  logout,
  oauthGoogleLogin,
  oauthGoogleCallback,
  oauthGoogleCallbackFailure
};
