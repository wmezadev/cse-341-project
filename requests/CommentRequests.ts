import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';

export const CommentStoreRequest = (request: Request, response: Response, next: NextFunction) => {
  const validation = new Validator(request.body, {
    post_id: 'required|string|max:255',
    content: 'required|string|max:255',
    published: 'required|boolean',
    author: 'required|alpha_dash|max:100'
  });

  if (validation.fails()) {
    return response.status(400).send({
      message: 'Whoops! Please check the errors',
      errors: validation.errors.errors
    });
  }

  next();
};

export const CommentUpdateRequest = (request: Request, response: Response, next: NextFunction) => {
  const validation = new Validator(request.body, {
    content: 'required|string|max:255',
    published: 'required|boolean'
  });

  if (validation.fails()) {
    return response.status(400).send({
      message: 'Whoops! Please check the errors',
      errors: validation.errors.errors
    });
  }

  next();
};
