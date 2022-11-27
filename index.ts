import express, { Express, Request, Response } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes';
import { APP_PORT, MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './config';
import { User } from './models';
import { VerifyCallback } from 'passport-google-oauth2';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Blog API Project @wmezadev <a href="/auth/google">Authenticate with Google</a>');
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(
    require('express-session')({
      secret: 'blog',
      resave: false,
      saveUninitialized: false
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use('/', router);

// passport config
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/google/callback',
      passReqToCallback: true
    },
    function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});
mongoose.connect(MONGODB_URI, {}, () => {
  app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
    console.log('Connected to mongodb');
  });
});
