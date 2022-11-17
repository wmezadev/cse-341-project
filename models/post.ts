import { Schema, model } from 'mongoose';

export interface IPost {
  title: string;
  slug: string;
  published: boolean;
  tags: string[];
  author: string;
  excerpt: string;
  created: Date;
  updated: Date;
  content: string;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
  tags: [String],
  author: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  content: {
    type: String,
    required: true
  }
});

export const Post = model<IPost>('Post', postSchema);
