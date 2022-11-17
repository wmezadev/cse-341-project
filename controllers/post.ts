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

const create = async (req: Request, res: Response) => {
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

export const PostController = { create, index };
