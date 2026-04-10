import type { Request, Response } from 'express';
import { userService } from '../services/userService.js';
import { Email } from '../utils/email.js';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;
        Email.validate(email);

        const user = await userService.create({ name, email });
        return res.status(200).json(user);
    };

    async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        return res.status(200).json(users);
    };

    async updateById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const { name, email } = req.body;

        if (email) Email.validate(email);

        const user = await userService.updateById(userId, { name, email });
        return res.status(200).json(user);
    };

    async deleteById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        await userService.deleteById(userId);
        return res.status(200).send();
    };
};

const userController = new UserController();
export { userController };