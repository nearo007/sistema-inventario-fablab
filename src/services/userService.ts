import { UserModel } from "../models/userModel.js"
import { prisma } from '../lib/prisma.js';

export class UserService {
    async getUsers() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    async createUser(username: string, email: string) {
        const user = await prisma.user.create({
            data: {
                name: username,
                email: email,
            },
        })
        return user;
    }

    async updateUserById(id: number, data: {name?: string, email?: string}) {
        await prisma.user.update({
            where: {id},
            data
        })
        return true;
    }

    async deleteUserById(id: number) {
        await prisma.user.delete({
            where: { id }
        })
        return true;
    }
}