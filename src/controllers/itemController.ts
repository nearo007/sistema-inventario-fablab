import type { Request, Response } from 'express';
import { itemService } from '../services/itemService.js';

class ItemController {
    async create(req: Request, res: Response) {
        const {
            name,
            category,
            totalQuantity,
            location
        } = req.body;

        const item = await itemService.create({
            name,
            category,
            totalQuantity,
            location
        });
        return res.status(200).json(item);
    };

    async getAll(req: Request, res: Response) {
        const items = await itemService.getAll();
        return res.status(200).json(items);
    };

    async updateById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const {
            name,
            category,
            totalQuantity,
            location
        } = req.body;

        const item = await itemService.updateById(itemId, {
            name,
            category,
            totalQuantity,
            location
        });
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