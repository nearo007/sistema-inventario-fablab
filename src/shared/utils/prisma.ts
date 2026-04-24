import { MESSAGES } from "@src/constants/messages.js";
import { Prisma } from "@src/generated/prisma/client.js";

export const handlePrismaError = (err: any): never => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002": {
                const meta = err.meta as {
                    driverAdapterError?: {
                        cause?: {
                            constraint?: {
                                fields?: string[];
                            };
                        };
                    };
                    target?: string[];
                };

                const fields = meta.target || meta.driverAdapterError?.cause?.constraint?.fields;
                const field = fields?.[0];

                if (field === "email") {
                    throw new Error(MESSAGES.USER.CONFLICT.EMAIL_EXISTS);
                }
                
                throw new Error("Conflito de restrição única.");
            }
            case "P2025":
                throw new Error(MESSAGES.USER.NOT_FOUND.GENERAL);
            case "P2020":
                throw new Error(MESSAGES.ITEM.VALIDATION.QUANTITY_INVALID);
            default:
                throw new Error(`Erro de banco de dados: ${err.code}`);
        }
    }

    throw err;
};