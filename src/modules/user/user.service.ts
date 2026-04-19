import { MESSAGES } from "../../constants/messages.js";
import { prisma } from "../../lib/prisma.js";

class UserService {
    async create(data: { name: string; email: string }) {
        const { name, email } = data;

        if (await prisma.user.findFirst({ where: { name } })) {
            throw new Error(MESSAGES.USER.CONFLICT.NAME_EXISTS);
        } else if (await prisma.user.findFirst({ where: { email } })) {
            throw new Error(MESSAGES.USER.CONFLICT.EMAIL_EXISTS);
        }

        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async getAll() {
        const allUsers = await prisma.user.findMany();

        if (!allUsers) throw new Error(MESSAGES.USER.NOT_FOUND.GENERAL);

        return allUsers;
    }

    async updateById(id: number, data: { name?: string; email?: string }) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data,
            });
            return user;
        } catch (err: any) {
            if (err.code == "P2002") {
                throw new Error(MESSAGES.USER.CONFLICT.NAME_EXISTS);
                throw new Error(MESSAGES.USER.CONFLICT.EMAIL_EXISTS);
            }
        }
    }

    async deleteById(id: number) {
        const user = await prisma.user.delete({
            where: { id },
        });
        return user;
    }
}

const userService = new UserService();
export { userService };
