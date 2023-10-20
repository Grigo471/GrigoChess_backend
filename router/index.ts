import { Router } from "express";
import UserController from "../controllers/userController";
import { body } from 'express-validator'; 
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post(
    '/registration',
    body('username').isLength({ min: 5, max: 32 }).notEmpty(),
    body('password').isLength({ min: 5, max: 32 }).notEmpty(), 
    UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

export default router;