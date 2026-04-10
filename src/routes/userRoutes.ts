import { Router } from 'express';
import { userController } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/create', userController.create);
userRouter.get('/', userController.getAll);
userRouter.patch('/:id', userController.updateById);
userRouter.delete('/:id', userController.deleteById);

export { userRouter }