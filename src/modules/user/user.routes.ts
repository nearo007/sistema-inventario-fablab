import { Router } from 'express';
import { userController } from '@modules/user/user.controller.js';
import { authMiddleware } from '@src/middlewares/authMiddleware.js';


const userRouter = Router();

userRouter.post('/create', userController.create);
userRouter.get('/', authMiddleware, userController.getAll);
userRouter.patch('/:id', authMiddleware, userController.updateById);
userRouter.delete('/:id', authMiddleware, userController.deleteById);

export { userRouter }