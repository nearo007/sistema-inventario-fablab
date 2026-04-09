import { prisma } from '../lib/prisma.js';

class ItemService {
    //TODO pass object argument and nullable variables
    async createItem(name: string, category: string, totalQuantity: number, location: string) {
        const item = await prisma.item.create({
            data: {name, category, totalQuantity, location}
        });
        return item;
    };
    
    async getItems() {
        const items = await prisma.item.findMany();
        return items;
    };

    async updateItem(id: number, data: {name?: string, category?: string, totalQuantity?: number, location?: string}) {
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