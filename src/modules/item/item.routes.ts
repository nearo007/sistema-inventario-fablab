import { Router } from 'express';
import { itemController } from '@modules/item/item.controller.js';
import { authMiddleware } from '@src/middlewares/authMiddleware.js';


const itemRouter = Router();

itemRouter.post('/create', authMiddleware, itemController.create);
itemRouter.get('/', authMiddleware, itemController.getAll);
itemRouter.patch('/:id', authMiddleware, itemController.updateById);
itemRouter.delete('/:id', authMiddleware, itemController.deleteById);

export { itemRouter };