import type { Request, Response } from 'express';
import { UserService } from '../services/userService.js';

const userService = new UserService();

export class UserController {
    async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers();
        return res.json(users);
    };

    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;

        const result = await userService.createUser(name, email);
        return res.json(result);
    }

    async updateUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const { name = undefined, email = undefined } = req.body;

        await userService.updateUserById(userId, {name, email});

        return res.status(200).send();
    }

    async deleteUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);

        await userService.deleteUserById(userId);

        return res.status(200).send();
    }
}