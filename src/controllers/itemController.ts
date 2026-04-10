import type { Request, Response } from 'express';
import { itemService } from '../services/itemService.js';

class ItemController {
    async createItem(req: Request, res: Response) {
        const {
            name,
            category,
            totalQuantity,
            location
        } = req.body;

        const item = await itemService.createItem({
            name,
            category,
            totalQuantity,
            location
        });
        return res.status(200).json(item);
    };

    async getItems(req: Request, res: Response) {
        const items = await itemService.getItems();
        return res.status(200).json(items);
    };

    async updateItemById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const {
            name,
            category,
            totalQuantity,
            location
        } = req.body;

        const item = await itemService.updateItemById(itemId, {
            name,
            category,
            totalQuantity,
            location
        });
        return res.status(200).json(item);
    }

    async deleteitemById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const item = await itemService.deleteItemById(itemId);
        return res.status(200).json(item);
    }
};

const itemController = new ItemController();
export { itemController };