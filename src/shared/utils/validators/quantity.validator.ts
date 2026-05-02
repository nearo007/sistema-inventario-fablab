import { MESSAGES } from "@src/constants/messages.js";

export class QuantityValidator {
    static validate(
        quantity: number,
        minQuantity: number = 0,
        maxQuantity?: number,
    ) {
        if (quantity === null || quantity === undefined) {
            throw new Error(MESSAGES.SHARED.VALIDATION.QUANTITY_REQUIRED);
        }

        if (!Number.isFinite(quantity)) {
            throw new Error(MESSAGES.SHARED.VALIDATION.QUANTITY_INVALID);
        }

        const disallowNegative = minQuantity === 0;

        if (disallowNegative && quantity < 0) {
            throw new Error(MESSAGES.SHARED.VALIDATION.QUANTITY_NEGATIVE);
        }

        if (quantity < minQuantity) {
            throw new Error(
                MESSAGES.SHARED.VALIDATION.QUANTITY_TOO_LOW(minQuantity),
            );
        }

        if (maxQuantity !== undefined && quantity > maxQuantity) {
            throw new Error(
                MESSAGES.SHARED.VALIDATION.QUANTITY_TOO_HIGH(maxQuantity),
            );
        }
    }
}
