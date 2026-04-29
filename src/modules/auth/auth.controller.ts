import type { Request, Response } from "express";
import type { LoginDTO } from "@modules/auth/auth.dtos.js";
import { authService } from "@modules/auth/auth.service.js";

class AuthController {
    async login(req: Request, res: Response) {
        const data: LoginDTO = req.body;

        const login = await authService.login(data);
        return res.status(200).json(login);
    }
}

const authController = new AuthController();
export { authController };
