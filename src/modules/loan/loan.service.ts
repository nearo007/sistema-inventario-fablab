import { prisma } from "../../lib/prisma.js";
import type { CreateLoanDTO } from "./loan.dtos.js";

class LoanService {
    async create(data: CreateLoanDTO) {
        const loan = await prisma.loan.create({
            data: {
                loanDate: new Date(data.loanDate),
                dueDate: new Date(data.dueDate),
                returnDate: data.returnDate ? new Date(data.returnDate) : null,
                userId: data.userId,
                itemId: data.itemId,
            },
        });
        return loan;
    }

    async getAll() {
        const loans = await prisma.loan.findMany();
        return loans;
    }

    async updateById(
        id: number,
        data: {
            loanDate?: Date;
            dueDate?: Date;
            returnDate?: Date | null;
        },
    ) {
        return prisma.loan.update({
            where: { id },
            data,
        });
    }

    async deleteById(id: number) {
        await prisma.loan.delete({
            where: { id },
        });
    }
}

const loanService = new LoanService();
export { loanService };
