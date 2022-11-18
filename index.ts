import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes';
import { APP_PORT, MONGODB_URI } from './config';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', router);

mongoose.connect(MONGODB_URI, {}, () => {
  app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
    console.log('Connected to mongodb');
  });
});
