import { MESSAGES } from "@src/constants/messages.js";

export class DateValidator {
    static validate(
        dateString: string,
        fieldName: string = MESSAGES.FIELDS.DATE,
    ) {
        if (!dateString) {
            throw new Error(
                MESSAGES.SHARED.VALIDATION.REQUIRED_FIELD(fieldName),
            );
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error(
                MESSAGES.SHARED.VALIDATION.INVALID_FIELD(fieldName),
            );
        }
    }
}
