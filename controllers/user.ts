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

export const UserController = { register };
