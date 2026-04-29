import { Router } from 'express';
import { loanController } from '@modules/loan/loan.controller.js';
import { authMiddleware } from '@src/middlewares/authMiddleware.js';

const loanRouter = Router();

loanRouter.post('/create', authMiddleware, loanController.create);
loanRouter.get('/', authMiddleware, loanController.getAll);
loanRouter.patch('/:id', authMiddleware, loanController.updateById);
loanRouter.delete('/:id', authMiddleware, loanController.deleteById);

export { loanRouter };