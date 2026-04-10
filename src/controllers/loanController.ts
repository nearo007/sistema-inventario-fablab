import type { Request, Response } from 'express';
import { loanService } from '../services/loanService.js'

class LoanController {
    async create(req: Request, res: Response) {
        const {
            userId,
            itemId,
            loanDate,
            dueDate,
            returnDate
        } = req.body;

        const loan = await loanService.create(userId, itemId, {
            loanDate: new Date(loanDate),
            dueDate: new Date(dueDate),
            returnDate: new Date(returnDate)
        });
        return res.json(loan);
    }

    async getAll(req: Request, res: Response) {
        const loans = await loanService.getLoans();
        return res.json(loans);
    }

    async updateById(req: Request, res: Response) {
        const loanId = Number(req.params.id);
        const {
            loanDate,
            dueDate,
            returnDate
        } = req.body;

        const loan = await loanService.updateById(loanId, {
            loanDate: new Date(loanDate),
            dueDate: new Date(dueDate),
            returnDate: new Date(returnDate)
        });
        return res.json(loan);
    }

    async deleteById(req: Request, res: Response) {
        const loanId = Number(req.params.id);
        await loanService.deleteById(loanId);
        return res.status(200).send();
    }
}

const loanController = new LoanController();
export { loanController };