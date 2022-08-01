import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';

/**
 * 验证用户数登录数据
 */
export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('验证用户登录数据');
  const { name, password } = request.body;

  //验证必填数据
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  //验证用户名
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error('NAME_DOES_NOT_EXIST'));

  //验证密码
  const match = await bcryptjs.compare(password, user.password);
  if (!match) return next(new Error('PASSWORD_NOT_MATCHED'));

  //下一步
  next();
};
