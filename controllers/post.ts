import { Request, Response } from 'express';
import { Post } from '../models';

const index = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const store = async (req: Request, res: Response) => {
  try {
    const { title, slug, published, tags, author, excerpt, content } = req.body;
    const post = new Post({
      title: title,
      slug: slug,
      published: published,
      tags: tags,
      author: author,
      excerpt: excerpt,
      created: new Date(),
      updated: new Date(),
      content: content
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
    const post = await Post.findOne({ _id: id });
    if (!post) {
      throw new Error('Post not found');
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, published, tags, author, excerpt, content } = req.body;
    const post = await Post.updateOne(
      { _id: id },
      {
        title,
        slug,
        published,
        tags,
        author,
        excerpt,
        content,
        updated: new Date()
      }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resp = await Post.findByIdAndRemove(id);
    if (!resp) {
      throw new Error('Post not found');
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const PostController = { index, store, show, update, destroy };
