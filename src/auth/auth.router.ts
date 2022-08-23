import express from 'express';
import * as authController from '../auth/auth.controller';
import { validateLoginData, authGuard } from './auth.middleware';

const router = express.Router();

router.post('/login', validateLoginData, authController.login);

/**
 * 定义验证登录接口
 */
router.post('/auth/validate', authGuard, authController.validate);

/**
 * 导出路由
 */
export default router;
