import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';

export const PostRequest = (request: Request, response: Response, next: NextFunction) => {
  const validation = new Validator(request.body, {
    title: 'required|string|min:3|max:255',
    slug: 'required|alpha_dash|min:3|max:255',
    published: 'required|boolean',
    tags: 'array',
    author: 'required|alpha_dash|max:100',
    excerpt: 'string|max:255',
    content: 'string|max:255'
  });

  if (validation.fails()) {
    return response.status(400).send({
      message: 'Whoops! Please check the errors',
      errors: validation.errors.errors
    });
  }

  next();
};
