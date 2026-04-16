import type { Request, Response } from "express";
import { loanService } from "./loan.service.js";
import type { CreateLoanDTO } from "./dtos/CreateLoanDTO.js";
import type { UpdateLoanDTO } from "./dtos/UpdateLoanDTO.js";

class LoanController {
    async create(req: Request, res: Response) {
        const data: CreateLoanDTO = req.body;

        const loan = await loanService.create(data.userId, data.itemId, {
            loanDate: new Date(data.loanDate),
            dueDate: new Date(data.dueDate),
            returnDate: data.returnDate ? new Date(data.returnDate) : null,
        });
        return res.json(loan);
    }

    async getAll(req: Request, res: Response) {
        const loans = await loanService.getAll();
        return res.json(loans);
    }

    async updateById(req: Request, res: Response) {
        const loanId = Number(req.params.id);
        const data: UpdateLoanDTO = req.body;

        const updateData: {
            loanDate?: Date;
            dueDate?: Date;
            returnDate?: Date | null;
        } = {};

        if (data.loanDate) {
            updateData.loanDate = new Date(data.loanDate);
        }

        if (data.dueDate) {
            updateData.dueDate = new Date(data.dueDate);
        }

        if (data.returnDate !== undefined) {
            updateData.returnDate = data.returnDate
                ? new Date(data.returnDate)
                : null;
        }

        const loan = await loanService.updateById(loanId, updateData);

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
