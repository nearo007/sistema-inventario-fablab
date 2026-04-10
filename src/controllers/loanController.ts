import type { Request, Response } from 'express';
import { loanService } from '../services/loanService.js'

class LoanController {
    async createLoan(req: Request, res: Response) {
        const {
            userId,
            itemId,
            loanDate,
            dueDate,
            returnDate
        } = req.body;

        const loan = await loanService.createLoan(userId, itemId, {
            loanDate: new Date(loanDate),
            dueDate: new Date(dueDate),
            returnDate: new Date(returnDate)
        });
        return res.json(loan);
    }

    async getLoans(req: Request, res: Response) {
        const loans = await loanService.getLoans();
        return res.json(loans);
    }

    async updateLoanById(req: Request, res: Response) {
        const loanId = Number(req.params.id);
        const {
            loanDate,
            dueDate,
            returnDate
        } = req.body;

        const loan = await loanService.updateLoanById(loanId, {
            loanDate: new Date(loanDate),
            dueDate: new Date(dueDate),
            returnDate: new Date(returnDate)
        });
        return res.json(loan);
    }

    async deleteLoanById(req: Request, res: Response) {
        const loanId = Number(req.params.id);
        await loanService.deleteLoanById(loanId);
        return res.status(200).send();
    }
}

const loanController = new LoanController();
export { loanController };