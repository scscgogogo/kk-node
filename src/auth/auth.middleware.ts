import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';

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

  //在请求主体里添加用户
  request.body.user = user;

  //下一步
  next();
};

/**
 * 验证用户身份
 */
export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('验证用户身份');

  try {
    //提取 Authorization
    const authorization = request.header('Authorization');
    if (!authorization) throw new Error();

    //提取JWT令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    //验证令牌
    jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

    //下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};
