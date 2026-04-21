import { MESSAGES } from "../../constants/messages.js";

export class Password {
    static validate(raw: string) {
        const minLength = 8;
        const hasLetterOrNumber = /[A-Za-z0-9]/;

        if (!raw) {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_REQUIRED);
        }

        const value = raw.trim();

        if (value === "") {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_INVALID);
        }

        if (!hasLetterOrNumber.test(value)) {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_INVALID);
        }

        if (value.length < minLength) {
            throw new Error(
                MESSAGES.USER.VALIDATION.PASSWORD_TOO_SHORT(minLength),
            );
        }
    }
}
