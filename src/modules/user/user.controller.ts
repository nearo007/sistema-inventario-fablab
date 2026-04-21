import type { Request, Response } from "express";
import { Email } from "../../shared/utils/validateEmail.js";
import { userService } from "./user.service.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dtos.js";
import { Password } from "../../shared/utils/validatePassword.js";

class UserController {
    async create(req: Request, res: Response) {
        const data: CreateUserDTO = req.body;
        Email.validate(data.email);
        Password.validate(data.password);

        const user = await userService.create(data);
        return res.status(200).json(user);
    }

    async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        return res.status(200).json(users);
    }

    async updateById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const data: UpdateUserDTO = req.body;

        if (data.email) Email.validate(data.email);

        const user = await userService.updateById(userId, data);
        return res.status(200).json(user);
    }

    async deleteById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        await userService.deleteById(userId);
        return res.status(200).send();
    }
}

const userController = new UserController();
export { userController };
