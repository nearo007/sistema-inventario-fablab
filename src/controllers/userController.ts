import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
    async getUsers(req: Request, res: Response): Promise<Response> {
        const users = await userService.getUsers();
        return res.json(users);
    };
}