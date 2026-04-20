import { MESSAGES } from "../../constants/messages.js";
import { prisma } from "../../lib/prisma.js";

class UserService {
    async create(data: { name: string; email: string }) {
        const { name, email } = data;

        try {
            const user = await prisma.user.create({
                data,
            });
            return user;
        } catch (err: any) {
            if (err.code === "P2002") {
                const uniqueConstraint =
                    err.meta.driverAdapterError.cause.constraint.fields[0];
                if (uniqueConstraint === "name") {
                    throw new Error(MESSAGES.USER.CONFLICT.NAME_EXISTS);
                } else if (uniqueConstraint === "email") {
                    throw new Error(MESSAGES.USER.CONFLICT.EMAIL_EXISTS);
                }
            }
            throw new Error(`Erro inesperado: ${err.code}`);
        }
    }

    async getAll() {
        const allUsers = await prisma.user.findMany();

        if (!allUsers) throw new Error(MESSAGES.USER.NOT_FOUND.ANY);

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
            if (err.code === "P2002") {
                const uniqueConstraint =
                    err.meta.driverAdapterError.cause.constraint.fields[0];
                if (uniqueConstraint === "name") {
                    throw new Error(MESSAGES.USER.CONFLICT.NAME_EXISTS);
                } else if (uniqueConstraint === "email") {
                    throw new Error(MESSAGES.USER.CONFLICT.EMAIL_EXISTS);
                }
            } else if (err.code === "P2025") {
                throw new Error(MESSAGES.USER.NOT_FOUND.GENERAL);
            }

            throw new Error(`Erro inesperado: ${err.code}`);
        }
    }

    async deleteById(id: number) {
        try {
            const user = await prisma.user.delete({
                where: { id },
            });
            return user;
        } catch (err: any) {
            if (err.code === "P2025") {
                throw new Error(MESSAGES.USER.NOT_FOUND.GENERAL);
            }

            throw new Error(`Erro inesperado: ${err.code}`);
        }
    }
}

const userService = new UserService();
export { userService };
