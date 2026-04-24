import { prisma } from "@lib/prisma.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import type { CreateLoanDTO } from "@loan/loan.dtos.js";

class LoanService {
    async create(data: CreateLoanDTO) {
        try {
            const loan = await prisma.loan.create({
                data: {
                    loanDate: new Date(data.loanDate),
                    dueDate: new Date(data.dueDate),
                    returnDate: data.returnDate ? new Date(data.returnDate) : null,
                    loanQuantity: data.loanQuantity,
                    userId: data.userId,
                    itemId: data.itemId,
                },
            });
            return loan;
        } catch (err:any) {
            handlePrismaError(err);
        }
    }

    async getAll() {
        try {
            const loans = await prisma.loan.findMany();
            return loans;
        } catch (err:any) {
            handlePrismaError(err);
        }
    }

    async updateById(
        id: number,
        data: {
            loanDate?: Date;
            dueDate?: Date;
            returnDate?: Date | null;
        },
    ) {
        try {
            return prisma.loan.update({
                where: { id },
                data,
            });
        } catch (err:any) {
            handlePrismaError(err);
        }
    }

    async deleteById(id: number) {
        try {
            await prisma.loan.delete({
                where: { id },
            });
        } catch (err:any) {
            handlePrismaError(err);
        }
    }
}

const loanService = new LoanService();
export { loanService };
