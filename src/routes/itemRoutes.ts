import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';

const itemRouter = Router();

itemRouter.post('/create', itemController.create);
itemRouter.get('/', itemController.getAll);
itemRouter.patch('/:id', itemController.updateById);
itemRouter.delete('/:id', itemController.deleteById);

export { itemRouter };