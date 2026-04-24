import { Router } from 'express';
import { userController } from '@user/user.controller.js';


const userRouter = Router();

userRouter.post('/create', userController.create);
userRouter.post('/login', userController.login);
userRouter.get('/', userController.getAll);
userRouter.patch('/:id', userController.updateById);
userRouter.delete('/:id', userController.deleteById);

export { userRouter }