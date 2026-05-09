import { prisma } from "@lib/prisma.js";
import type { CreateClientDTO, UpdateClientDTO } from "./client.dtos.js";
import { CreateClientValidator } from "./input-validation/create-client.validator.js";

class ClientService {
    async create(data: CreateClientDTO) {
        CreateClientValidator.validate(data);
        const client = await prisma.client.create({ data });
        return client;
    }

    async getAll() {
        const clients = await prisma.client.findMany();
        return clients;
    }

    async getById(id: number) {
        const client = await prisma.client.findUnique({ where: { id } });
        return client;
    }

    async updateById(id: number, data: UpdateClientDTO) {
        const client = await prisma.client.update({ where: { id }, data });
        return client;
    }

    async deleteById(id: number) {
        const client = await prisma.client.delete({ where: { id } });
        return client;
    }
}

const clientService = new ClientService();
export { clientService };
