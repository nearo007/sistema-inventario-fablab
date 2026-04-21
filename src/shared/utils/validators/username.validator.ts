import { MESSAGES } from "../../../constants/messages.js";

export class UsernameValidator {
    static validate(raw: string) {
        const minLength = 3;
        const maxLength = 24;
        const onlyValidCharacters = /^[a-zA-Z0-9._-]+$/;

        if (!raw) {
            throw new Error(MESSAGES.USER.VALIDATION.USERNAME_REQUIRED);
        }

        const value = raw.trim();

        if (value === "") {
            throw new Error(MESSAGES.USER.VALIDATION.USERNAME_INVALID);
        }

        if (!onlyValidCharacters.test(value)) {
            throw new Error(MESSAGES.USER.VALIDATION.USERNAME_INVALID);
        }

        if (value.length < minLength) {
            throw new Error(
                MESSAGES.USER.VALIDATION.USERNAME_TOO_SHORT(minLength),
            );
        } else if (value.length > maxLength) {
            throw new Error(
                MESSAGES.USER.VALIDATION.USERNAME_TOO_LONG(maxLength),
            );
        }
    }
}
