import express from 'express';
import cors from 'cors';
import postRounter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import { defaultErrorHandler } from './app.middleware';
/**
 * 创建应用
 */
const app = express();

/**
 * 跨域资源共享
 */
app.use(cors({ origin: '*', exposedHeaders: 'X-Total-Count' }));

/**
 * 处理 JSON
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRounter, userRouter, authRouter, fileRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;
