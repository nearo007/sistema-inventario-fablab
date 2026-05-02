import { MESSAGES } from "@src/constants/messages.js";

export class IdValidator {
    static validate(id: number) {
        if (id === null || id === undefined) {
            throw new Error(MESSAGES.SHARED.VALIDATION.REQUIRED_FIELD(MESSAGES.FIELDS.ID));
        }

        if (!Number.isInteger(id)) {
            throw new Error(MESSAGES.SHARED.VALIDATION.INVALID_FIELD(MESSAGES.FIELDS.ID));
        }

        if (id < 1) {
            throw new Error(MESSAGES.SHARED.VALIDATION.INVALID_FIELD(MESSAGES.FIELDS.ID));
        }
    }
}
