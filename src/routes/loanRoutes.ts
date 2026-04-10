import { Router } from 'express';
import { loanController } from '../controllers/loanController.js';

const loanRouter = Router();

loanRouter.post('/create', loanController.create);
loanRouter.get('/', loanController.getAll);
loanRouter.patch('/:id', loanController.updateById);
loanRouter.delete('/:id', loanController.deleteById);

export { loanRouter };