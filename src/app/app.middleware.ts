import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求地址
 */
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
};

/**
 * 默认异常处理器
 */
export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message) {
    console.log('🚧', error.message);
  }
  let statusCode: number, message: string;

  /**
   * 处理异常
   */
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'NAME_ALREADY_EXIST':
      statusCode = 409;
      message = '用户名已存在';
      break;
    case 'NAME_DOES_NOT_EXIST':
      statusCode = 400;
      message = '没有该用户';
      break;
    case 'PASSWORD_NOT_MATCHED':
      statusCode = 400;
      message = '密码不对';
      break;
    case 'UNAUTHORIZED':
      statusCode = 401;
      message = '请先登录';
      break;
    case 'USER_DOES_NOT_OWN_RESOURCE':
      statusCode = 403;
      message = '没有权限';
      break;
    default:
      statusCode = 500;
      message = '服务暂时出了点问题 ~~ 🌴';
      break;
  }

  response.status(statusCode).send({ message });
};
