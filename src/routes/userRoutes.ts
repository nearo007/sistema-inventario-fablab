import { Router } from 'express';
import { userController } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.patch('/:id', userController.updateUserById);
userRouter.delete('/:id', userController.deleteUserById);

export { userRouter }