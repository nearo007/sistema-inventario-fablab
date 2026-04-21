import { MESSAGES } from "../../../constants/messages.js";

export class PasswordValidator {
    static validate(raw: string, passwordConfirm: string) {
        const minLength = 6;
        const maxLength = 18;
        const hasOneLetterOrNumber = /[A-Za-z0-9]/;

        if (!raw || !passwordConfirm) {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_REQUIRED);
        }

        if (raw !== passwordConfirm) {
            throw new Error(MESSAGES.USER.CONFLICT.PASSWORDS_DO_NOT_MATCH)
        }

        const value = raw.trim();

        if (value === "") {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_INVALID);
        }

        if (!hasOneLetterOrNumber.test(value)) {
            throw new Error(MESSAGES.USER.VALIDATION.PASSWORD_INVALID);
        }

        if (value.length < minLength) {
            throw new Error(
                MESSAGES.USER.VALIDATION.PASSWORD_TOO_SHORT(minLength),
            );
        }

        else if (value.length > maxLength) {
            throw new Error(
                MESSAGES.USER.VALIDATION.PASSWORD_TOO_LONG(maxLength),
            )
        }
    }
}
