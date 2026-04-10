import { prisma } from '../lib/prisma.js';

class ItemService {
    async createItem(data: {name: string, category?: string, totalQuantity: number, location: string}) {
        const item = await prisma.item.create({
            data
        });
        return item;
    };
    
    async getItems() {
        const items = await prisma.item.findMany();
        return items;
    };

    async updateItemById(id: number, data: {name?: string, category?: string, totalQuantity?: number, location?: string}) {
        await prisma.item.update({
            where: {id},
            data
        });
        return true;
    }

    async deleteItemById(id: number) {
        await prisma.item.delete({
            where: {id}
        });
        return true;
    }
};

const itemService = new ItemService();
export { itemService };