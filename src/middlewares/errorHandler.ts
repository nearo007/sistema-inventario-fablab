import { handlePrismaError } from "@src/shared/utils/prisma.js";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        handlePrismaError(err);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({ errorMessage: e.message });
        }

        return res.status(500).json({ errorMessage: "Erro interno" });
    }
}
