import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MONGODB_URI } from './config';
import { routes } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes);

mongoose.connect(MONGODB_URI, {}, () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log('Connected to mongodb');
  });
});
