import { prisma } from "@lib/prisma.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import type { CreateLoanDTO } from "@modules/loan/loan.dtos.js";
import { CreateLoanValidator } from "./input-validation/create-loan.validator.js";

class LoanService {
    async create(data: CreateLoanDTO) {
        CreateLoanValidator.validate(data);

        const loan = await prisma.loan.create({
            data: {
                loanDate: new Date(data.loanDate),
                dueDate: new Date(data.dueDate),
                returnDate: data.returnDate ? new Date(data.returnDate) : null,
                loanQuantity: data.loanQuantity,
                clientId: data.clientId,
                itemId: data.itemId,
            },
        });

        return loan;
    }

    async getAll() {
        const loans = await prisma.loan.findMany();
        return loans;
    }

    async getById(id: number) {
        const loan = await prisma.loan.findUnique({ where: { id } });
        return loan;
    }

    async updateById(
        id: number,
        data: {
            loanDate?: Date;
            dueDate?: Date;
            returnDate?: Date | null;
        },
    ) {
        const loan = await prisma.loan.update({
            where: { id },
            data,
        });

        return loan;
    }

    async deleteById(id: number) {
        const loan = await prisma.loan.delete({
            where: { id },
        });

        return loan;
    }
}

const loanService = new LoanService();
export { loanService };
