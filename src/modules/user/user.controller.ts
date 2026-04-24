import type { Request, Response } from "express";
import { EmailValidator } from "@shared/utils/validators/email.validator.js";
import { userService } from "@user/user.service.js";
import type { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "@user/user.dtos.js";
import { UsernameValidator } from "@shared/utils/validators/username.validator.js";

class UserController {
    async create(req: Request, res: Response) {
        const data: CreateUserDTO = req.body;

        const user = await userService.create(data);
        return res.status(200).json(user);
    }

    async login(req: Request, res: Response) {
        const data: LoginUserDTO = req.body

        const login = await userService.login(data);
        return res.status(200).json(login);
    }

    async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        return res.status(200).json(users);
    }

    async updateById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const data: UpdateUserDTO = req.body;

        if (data.email) EmailValidator.validate(data.email);
        if (data.name) UsernameValidator.validate(data.name);

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
