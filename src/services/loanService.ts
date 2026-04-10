import { prisma } from '../lib/prisma.js'

class LoanService {
    async create(userId: number, itemId: number, data: {loanDate: Date, dueDate: Date, returnDate: Date}) {
        const loan = await prisma.loan.create({
            data: {
                user: {connect: {id: userId}},
                item: {connect: {id: itemId}},
                ...data,
            }
        });
        return loan;
    };

    async getAll() {
        const loans = await prisma.loan.findMany();
        return loans;
    };

    async updateById(id: number, data: {loanDate?: Date, dueDate?: Date, returnDate?: Date}) {
        const loan = await prisma.loan.update({
            where: {id},
            data
        });
    };

    async deleteById(id: number) {
        await prisma.loan.delete({
            where: {id}
        });
    };
}

const loanService = new LoanService();
export { loanService }