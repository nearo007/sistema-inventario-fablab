import { prisma } from '../lib/prisma.js';

class ItemService {
    async create(data: {name: string, category?: string, totalQuantity: number, location: string}) {
        const item = await prisma.item.create({
            data
        });
        return item;
    };
    
    async getAll() {
        const items = await prisma.item.findMany();
        return items;
    };

    async updateById(id: number, data: {name?: string, category?: string, totalQuantity?: number, location?: string}) {
        const item = await prisma.item.update({
            where: {id},
            data
        });
        return item;
    }

    async deleteById(id: number) {
        const item = await prisma.item.delete({
            where: {id}
        });
        return item;
    }
};

const itemService = new ItemService();
export { itemService };