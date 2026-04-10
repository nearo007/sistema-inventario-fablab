import { Router } from 'express';
import { loanController } from '../controllers/loanController.js';

const loanRouter = Router();

loanRouter.post('/create', loanController.createLoan);
loanRouter.get('/', loanController.getLoans);
loanRouter.patch('/:id', loanController.updateLoanById);
loanRouter.delete('/:id', loanController.deleteLoanById);

export { loanRouter };