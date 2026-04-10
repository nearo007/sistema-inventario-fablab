import type { Request, Response } from 'express';
import { userService } from '../services/userService.js';
import { Email } from '../domain/Email.js';

class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;
        const validEmail = Email.validate(email)
        const user = await userService.createUser({ name, email: validEmail });
        return res.json(user);
    };

    async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers();
        return res.json(users);
    };

    async updateUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const { name, email } = req.body;

        const validEmail = Email.validate(email);

        await userService.updateUserById(userId, { name, email: validEmail });
        return res.status(200).send();
    };

    async deleteUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        await userService.deleteUserById(userId);
        return res.status(200).send();
    };
};

const userController = new UserController();
export { userController };