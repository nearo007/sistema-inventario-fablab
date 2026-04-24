import type { Request, Response } from 'express';
import { itemService } from '@modules/item/item.service.js';
import type { CreateItemDTO, UpdateItemDTO } from '@modules/item/item.dtos.js';

class ItemController {
    async create(req: Request, res: Response) {
        const data: CreateItemDTO = req.body;

        const item = await itemService.create(data);
        return res.status(200).json(item);
    };

    async getAll(req: Request, res: Response) {
        const items = await itemService.getAll();
        return res.status(200).json(items);
    };

    async updateById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const data: UpdateItemDTO = req.body;

        const item = await itemService.updateById(itemId, data);
        return res.status(200).json(item);
    }

    async deleteById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const item = await itemService.deleteById(itemId);
        return res.status(200).json(item);
    }
};

const itemController = new ItemController();
export { itemController };