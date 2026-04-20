import { MESSAGES } from "../../constants/messages.js";
import { prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../middlewares/errorHandler.js";
import { handlePrismaError } from "../../utils/prisma.js";
class UserService {
    async create(data: { name: string; email: string }) {
        const { name, email } = data;

        try {
            const user = await prisma.user.create({
                data,
            });
            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async getAll() {
        try {
            const allUsers = await prisma.user.findMany();
            return allUsers;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async updateById(id: number, data: { name?: string; email?: string }) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data,
            });
            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async deleteById(id: number) {
        try {
            const user = await prisma.user.delete({
                where: { id },
            });
            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const userService = new UserService();
export { userService };
