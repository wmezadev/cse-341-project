import { Schema, model } from 'mongoose';

export interface IComment {
  post_id: string;
  content: string;
  published: boolean;
  author: string;
  created: Date;
  updated: Date;
}

const schema = new Schema<IComment>({
  post_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export const Comment = model<IComment>('Comment', schema);
