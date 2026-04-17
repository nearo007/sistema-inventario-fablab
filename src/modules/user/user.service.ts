import { USER } from "../../constants/messages/user.js";
import { prisma } from "../../lib/prisma.js";

class UserService {
    async create(data: { name: string; email: string }) {
        try {
            const user = await prisma.user.create({
                data,
            });
            return user;
        } catch (err: any) {
            if (err.code == "P2002") {
                throw new Error(USER.create.email.alreadyExists);
            }
        }
    }

    async getAll() {
        const allUsers = await prisma.user.findMany();

        if (!allUsers) throw new Error(USER.read.any.notFound);

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
                throw new Error(USER.update.email.alreadyExists);
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
