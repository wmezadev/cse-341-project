import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || '';
export const APP_PORT = process.env.PORT || 8080;
