import { prisma } from '../lib/prisma.js';

class UserService {
    async createUser(data: {name?: string, email: string}) {
        const user = await prisma.user.create({
            data
        });
        return user;
    };
    
    async getUsers() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    };

    async updateUserById(id: number, data: {name?: string, email?: string}) {
        await prisma.user.update({
            where: {id},
            data
        });
        return true;
    };

    async deleteUserById(id: number) {
        await prisma.user.delete({
            where: { id }
        });
        return true;
    };
};

const userService = new UserService();
export { userService };