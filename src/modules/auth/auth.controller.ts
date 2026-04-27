import type { Request, Response } from "express";
import type { LoginDTO } from "@modules/auth/auth.dtos.js";
import { authService } from "@modules/auth/auth.service.js";

class AuthController {
    async login(req: Request, res: Response) {
        const data: LoginDTO = req.body;

        const login = await authService.login(data);
        return res.status(200).json(login);
    }

    // async auth(req: Request, res: Response) {
    //     const token = req.headers.authorization?.split(" ")[1];

    //     if (!token) return res.status(401).json({ error: "Token ausente" });

    //     try {
    //         const payload = jwt.verify(token, process.env.JWT_SECRET!);
    //         req.userId = payload.sub;
    //         next();
    //     } catch {
    //         res.status(401).json({ error: "Token inválido ou expirado" });
    //     }
    // }
}

const authController = new AuthController();
export { authController };
