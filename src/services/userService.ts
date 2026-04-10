import { prisma } from '../lib/prisma.js';

class UserService {
    async createUser(data: { name?: string, email: string }) {
        const alreadyExists = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
        });

        if (alreadyExists) throw new Error("Esse email já está cadastrado no sistema");

        const user = await prisma.user.create({
            data
        });
        return user;
    };

    async getUsers() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    };

    async updateUserById(id: number, data: { name?: string, email?: string }) {
        const user = await prisma.user.update({
            where: { id },
            data
        });
        return user;
    };

    async deleteUserById(id: number) {
        const user = await prisma.user.delete({
            where: { id }
        });
        return user;
    };
};

const userService = new UserService();
export { userService };