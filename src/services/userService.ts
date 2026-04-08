import { UserModel } from "../models/userModel.js"
import { prisma } from '../lib/prisma.js';

export class UserService {
    async getUsers() {
        const allUsers = await prisma.user.findMany({
            include: {
                posts: true,
            },
        });

        return allUsers;
    }

    async createUser(username: String) {
    const user = prisma.user.create({
        data: {
            name: `${username}`,
            email: `${username}@prisma.io`,
            posts: {
                create: {
                    title: "Hello World",
                    content: "This is my first post!",
                    published: true,
                },
            },
        }
    })

    return user;
}
}