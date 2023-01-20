import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';

/**
 * 创建用户
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, password } = request.body;
  try {
    const data = await userService.createUser({ name, password });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 查找用户
 */
export const search = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request.params;
  try {
    console.log(`${userId}`);
    const data = await userService.getUserById(parseInt(userId, 10));
    response.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
