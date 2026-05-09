import { Router } from 'express';
import { clientController } from '@modules/client/client.controller.js';
import { authMiddleware } from '@src/middlewares/authMiddleware.js';

const clientRouter = Router();

clientRouter.post('/create', authMiddleware, clientController.create);
clientRouter.get('/', authMiddleware, clientController.getAll);
clientRouter.get('/:id', authMiddleware, clientController.getById);
clientRouter.patch('/:id', authMiddleware, clientController.updateById);
clientRouter.delete('/:id', authMiddleware, clientController.deleteById);

export { clientRouter };
