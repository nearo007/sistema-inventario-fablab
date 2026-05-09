import type { Request, Response } from "express";
import { clientService } from "@modules/client/client.service.js";
import type { CreateClientDTO, UpdateClientDTO } from "@modules/client/client.dtos.js";

class ClientController {
    async create(req: Request, res: Response) {
        const data: CreateClientDTO = req.body;
        const client = await clientService.create(data);
        return res.status(200).json(client);
    }

    async getAll(req: Request, res: Response) {
        const clients = await clientService.getAll();
        return res.status(200).json(clients);
    }

    async getById(req: Request, res: Response) {
        const clientId = Number(req.params.id);
        const client = await clientService.getById(clientId);
        return res.status(200).json(client);
    }

    async updateById(req: Request, res: Response) {
        const clientId = Number(req.params.id);
        const data: UpdateClientDTO = req.body;
        const client = await clientService.updateById(clientId, data);
        return res.status(200).json(client);
    }

    async deleteById(req: Request, res: Response) {
        const clientId = Number(req.params.id);
        await clientService.deleteById(clientId);
        return res.status(200).send();
    }
}

const clientController = new ClientController();
export { clientController };
