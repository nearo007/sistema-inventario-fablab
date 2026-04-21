import { prisma } from "../../lib/prisma.js";
import { Bcrypt } from "../../shared/utils/bcrypt.js";
import { handlePrismaError } from "../../shared/utils/prisma.js";
class UserService {
    async create(data: { name: string; email: string; password: string }) {
        try {
            const { name, email, password } = data;
            
            const passwordHash = await Bcrypt.hashPassword(password);
            
            const hashedData = { name, email, passwordHash };
            const user = await prisma.user.create({
                data: hashedData,
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

