import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';
/**
 * 验证用户数据
 */
export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('验证用户数据');
  const { name, password } = request.body;
  //验证必填数据
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  //验证用户名
  const user = await userService.getUserByName(name);
  if (user) return next(new Error('NAME_ALREADY_EXIST'));

  //下一步
  next();
};

/**
 * HASH 密码
 */
export const hashPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { password } = request.body;
  request.body.password = await bcryptjs.hash(password, 10);
  next();
};
