import { Request, Response } from 'express';
import { Comment } from '../models';

const index = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({});
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const { post_id, content, published, author } = req.body;
    const post = new Comment({
      post_id,
      content,
      published,
      author,
      created: new Date(),
      updated: new Date()
    });
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Comment.findOne({ _id: id });
    if (!post) {
      throw new Error('Comment not found');
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resp = await Comment.findByIdAndRemove(id);
    if (!resp) {
      throw new Error('Comment not found');
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getByPost = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      throw new Error('Comment not found');
    }
    const posts = await Comment.find({ post_id });
    if (!posts) {
      throw new Error('Comment not found');
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const udpate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, published } = req.body;
    const resp = await Comment.updateOne(
      { _id: id },
      {
        content,
        published,
        updated: new Date()
      }
    );
    if (!resp) {
      throw new Error('Comment not found');
    }
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const CommentController = { index, store, show, destroy, getByPost, udpate };
