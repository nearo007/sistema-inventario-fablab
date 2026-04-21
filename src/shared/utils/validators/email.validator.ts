import { MESSAGES } from "../../../constants/messages.js";

export class EmailValidator {
    static validate(raw: string) {
        if (!raw || raw.trim() === '') {
            throw new Error(MESSAGES.USER.VALIDATION.EMAIL_REQUIRED);
        };

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
            throw new Error(MESSAGES.USER.VALIDATION.EMAIL_INVALID);
        };
    }
}