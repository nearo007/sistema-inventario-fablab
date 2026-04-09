import type { Request, Response } from 'express';
import { itemService } from '../services/itemService.js';

class ItemController {
    async createItem(req: Request, res: Response) {
        const {name, category, totalQuantity, location} = req.body;

        const item = await itemService.createItem(name, category, totalQuantity, location);
        return res.json(item);
    };

    async getItems(req: Request, res: Response) {
        const items = await itemService.getItems();
        return res.json(items);
    };

    async updateItem(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        const {
            name = undefined,
            category = undefined,
            totalQuantity = undefined,
            location = undefined
        } = req.body;

        await itemService.updateItem(itemId, {name, category, totalQuantity, location});
        return res.status(200).send();
    }

    async deleteitemById(req: Request, res: Response) {
        const itemId = Number(req.params.id);
        await itemService.deleteItemById(itemId);
        return res.status(200).send();
    }
};

const itemController = new ItemController();
export { itemController };