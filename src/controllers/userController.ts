import type { Request, Response } from 'express';
import { userService } from '../services/userService.js';
import { Email } from '../utils/email.js';

class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;
        Email.validate(email);

        const user = await userService.createUser({ name, email });
        return res.status(200).json(user);
    };

    async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    };

    async updateUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const { name, email } = req.body;

        Email.validate(email);

        const user = await userService.updateUserById(userId, { name, email });
        return res.status(200).json(user);
    };

    async deleteUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        await userService.deleteUserById(userId);
        return res.status(200).send();
    };
};

const userController = new UserController();
export { userController };