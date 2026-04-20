import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof Error) {
        return res.status(400).json({ errorMessage: err.message });
    }

    return res.status(500).json({ errorMessage: "Erro interno" })
}