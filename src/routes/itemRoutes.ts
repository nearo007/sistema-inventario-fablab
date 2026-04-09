import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';

const itemRouter = Router();

itemRouter.post('/create', itemController.createItem);
itemRouter.get('/', itemController.getItems);
itemRouter.patch('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteitemById);

export { itemRouter };