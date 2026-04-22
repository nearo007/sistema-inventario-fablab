import { MESSAGES } from "../../../constants/messages.js";
import type { CreateItemDTO } from "../item.dtos.js";

export class CreateItemValidator {
    static validate(data: CreateItemDTO) {
        const minNameLength = 2;
        const maxNameLength = 50;
        const maxCategoryLength = 30;
        const maxLocationLength = 80;

        const name = data.name?.trim();
        const category = data.category?.trim();
        const location = data.location?.trim();
        const totalQuantity = data.totalQuantity;

        if (!name) {
            throw new Error(MESSAGES.ITEM.VALIDATION.NAME_REQUIRED);
        }

        if (name.length < minNameLength) {
            throw new Error(MESSAGES.ITEM.VALIDATION.NAME_TOO_SHORT(minNameLength));
        }

        if (name.length > maxNameLength) {
            throw new Error(MESSAGES.ITEM.VALIDATION.NAME_TOO_LONG(maxNameLength));
        }

        if (category) {
            if (category.length > maxCategoryLength) {
                throw new Error(MESSAGES.ITEM.VALIDATION.CATEGORY_TOO_LONG(maxCategoryLength));
            }
        }

        if (totalQuantity === null || totalQuantity === undefined) {
            throw new Error(MESSAGES.ITEM.VALIDATION.QUANTITY_REQUIRED);
        }

        if (!Number.isFinite(totalQuantity)) {
            throw new Error(MESSAGES.ITEM.VALIDATION.QUANTITY_INVALID);
        }

        if (totalQuantity < 0) {
            throw new Error(MESSAGES.ITEM.VALIDATION.QUANTITY_NEGATIVE);
        }

        if (!location) {
            throw new Error(MESSAGES.ITEM.VALIDATION.LOCATION_REQUIRED);
        }

        if (location.length > maxLocationLength) {
            throw new Error(MESSAGES.ITEM.VALIDATION.LOCATION_TOO_LONG(maxLocationLength));
        }
    }
}