import type { Request, Response } from 'express';
import { UserService } from '../services/userService.js';

const userService = new UserService();

export class UserController {
    async getUsers(req: Request, res: Response){
        const users = await userService.getUsers();
        return res.json(users);
    };

    async createUser(req: Request, res: Response) {
        const { user } = req.body;

        const result = await userService.createUser(user);

        return res.json(result);
    }
}