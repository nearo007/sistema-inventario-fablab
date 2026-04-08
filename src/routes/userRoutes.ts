import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);

router.post('/create', userController.createUser);
router.delete('/:id', userController.deleteUserById);
router.patch('/:id', userController.updateUserById);

export { router }