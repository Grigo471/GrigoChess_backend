import { UserController } from "../controllers/userController";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

export default router;