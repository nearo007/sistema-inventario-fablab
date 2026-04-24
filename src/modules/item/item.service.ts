import { prisma } from "@lib/prisma.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import type { CreateItemDTO, UpdateItemDTO } from "@modules/item/item.dtos.js";
import { CreateItemValidator } from "@modules/item/validators/create-item.validator.js";

class ItemService {
    async create(data: CreateItemDTO) {
        try {
            CreateItemValidator.validate(data);
            const item = await prisma.item.create({
                data,
            });
            return item;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async getAll() {
        try {
            const items = await prisma.item.findMany();
            return items;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async updateById(id: number, data: UpdateItemDTO) {
        try {
            const item = await prisma.item.update({
                where: { id },
                data,
            });
            return item;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async deleteById(id: number) {
        try {
            const item = await prisma.item.delete({
                where: { id },
            });
            return item;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const itemService = new ItemService();
export { itemService };
