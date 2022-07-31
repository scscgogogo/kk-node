import express from 'express';
import * as authController from '../auth/auth.controller';
import { validateLoginData } from './auth.middleware';

const router = express.Router();

router.post('/login', validateLoginData, authController.login);

/**
 * 导出路由
 */
export default router;
