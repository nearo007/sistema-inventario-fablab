import { Router } from 'express';
import { loanController } from '@loan/loan.controller.js';

const loanRouter = Router();

loanRouter.post('/create', loanController.create);
loanRouter.get('/', loanController.getAll);
loanRouter.patch('/:id', loanController.updateById);
loanRouter.delete('/:id', loanController.deleteById);

export { loanRouter };