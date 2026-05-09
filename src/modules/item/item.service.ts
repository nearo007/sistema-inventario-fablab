import { prisma } from "@lib/prisma.js";
import type {
    CreateItemDTO,
    ListByCategoryDTO,
    ListByLocationDTO,
    UpdateItemDTO,
} from "@modules/item/item.dtos.js";
import { CreateItemValidator } from "@src/modules/item/input-validation/create-item.validator.js";

class ItemService {
    async create(data: CreateItemDTO) {
        CreateItemValidator.validate(data);

        const item = await prisma.item.create({
            data,
        });

        return item;
    }

    async list() {
        const items = await prisma.item.findMany();
        return items;
    }

    async getById(id: number) {
        const item = await prisma.item.findUnique({ where: { id } });
        return item;
    }

    async listByCategory({ category }: ListByCategoryDTO) {
        const items = await prisma.item.findMany({
            where: {
                category,
            },
        });

        return items;
    }

    async listByLocation({ location }: ListByLocationDTO) {
        const items = await prisma.item.findMany({
            where: {
                location,
            },
        });

        return items;
    }

    async updateById(id: number, data: UpdateItemDTO) {
        const item = await prisma.item.update({
            where: { id },
            data,
        });

        return item;
    }

    async deleteById(id: number) {
        const item = await prisma.item.delete({
            where: { id },
        });

        return item;
    }
}

const itemService = new ItemService();
export { itemService };
