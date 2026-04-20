import { Prisma } from "../generated/prisma/client.js";
import { MESSAGES } from "../constants/messages.js";

export const handlePrismaError = (err: any): never => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002": { // Unique constraint
                const field = (err.meta?.target as string[])?.includes("email") ? "EMAIL" : "NAME";
                console.log(field)
                throw new Error(MESSAGES.USER.CONFLICT[`${field}_EXISTS`]);
            }
            case "P2025": // Record not found
                throw new Error(MESSAGES.USER.NOT_FOUND.GENERAL);
            default:
                throw new Error(`Erro de banco de dados: ${err.code}`);
        }
    }
    
    throw err;
};