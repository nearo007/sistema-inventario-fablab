import { prisma } from '../lib/prisma.js';

class UserService {
    async create(data: { name?: string, email: string }) {
        try {
            const user = await prisma.user.create({
                data
            });
            return user;
        } catch (err: any) {
            if (err.code == 'P2002') {
                throw new Error("Email já está cadastrado no sistema!");
            }
        }
    };

    async getAll() {
        const allUsers = await prisma.user.findMany();

        if (!allUsers) throw new Error("Nenhum usuário cadastrado no sistema.");

        return allUsers;
    };

    async updateById(id: number, data: { name?: string, email?: string }) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data
            });
            return user;
        } catch (err: any) {
            if (err.code == 'P2002') {
                throw new Error("Email já está cadastrado no sistema!");
            }
        }
    };

    async deleteById(id: number) {

        const user = await prisma.user.delete({
            where: { id }
        });
        return user;
    };
};

const userService = new UserService();
export { userService };