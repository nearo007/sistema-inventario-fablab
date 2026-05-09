import { prisma } from "@lib/prisma.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import { MESSAGES } from "@src/constants/messages.js";
import type { CreateClientDTO, UpdateClientDTO } from "@modules/client/client.dtos.js";
import { CreateClientValidator } from "@modules/client/input-validation/create-client.validator.js";

class ClientService {
    async create(data: CreateClientDTO) {
        try {
            CreateClientValidator.validate(data);
            const client = await prisma.client.create({ data });
            return client;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async getAll() {
        try {
            const clients = await prisma.client.findMany();
            return clients;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async getById(id: number) {
        try {
            const client = await prisma.client.findUnique({ where: { id } });
            if (!client) throw new Error(MESSAGES.CLIENT.VALIDATION.NOT_FOUND);
            return client;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async updateById(id: number, data: UpdateClientDTO) {
        try {
            const client = await prisma.client.update({
                where: { id },
                data,
            });
            return client;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async deleteById(id: number) {
        try {
            await prisma.client.delete({ where: { id } });
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const clientService = new ClientService();
export { clientService };
