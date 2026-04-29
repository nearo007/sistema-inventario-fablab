import { TokenService } from "@src/shared/services/token.service.js";
import type { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token ausente" });
    }

    try {
        const payload = TokenService.verify(token);
        req.userId = typeof payload.sub === 'string' ? payload.sub : undefined;
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}
