import { Request, Response, NextFunction } from 'express';
import { createPost, deletePost, getPosts, updatePost } from './post.service';
import _ from 'lodash';
/**
 * 内容列表
 */
export const index = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * 创建内容
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = request.body;
    //准备用户数据
    const { id: userId } = request.user;
    const data = await createPost({ title, content, userId });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新内容
 */
export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { postId } = request.params;
    const post = _.pick(request.body, ['title', 'content']);
    const data = await updatePost(parseInt(postId, 10), post);
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 删除内容
 */
export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { postId } = request.params;
    const data = await deletePost(parseInt(postId, 10));
    response.send(data);
  } catch (error) {
    next(error);
  }
};
