import type { CreateClientDTO } from "@modules/client/client.dtos.js";
import { MESSAGES } from "@src/constants/messages.js";
import { EmailValidator } from "@src/shared/utils/validators/email.validator.js";

export class CreateClientValidator {
    static validate(data: CreateClientDTO) {
        const minNameLength = 2;
        const maxNameLength = 50;
        const maxPhoneLength = 15;

        const name = data.name?.trim();
        const phone = data.phone?.trim();

        if (!name) {
            throw new Error(MESSAGES.CLIENT.VALIDATION.NAME_REQUIRED);
        }
        if (name.length < minNameLength) {
            throw new Error(MESSAGES.CLIENT.VALIDATION.NAME_TOO_SHORT(minNameLength));
        }
        if (name.length > maxNameLength) {
            throw new Error(MESSAGES.CLIENT.VALIDATION.NAME_TOO_LONG(maxNameLength));
        }

        EmailValidator.validate(data.email);

        if (phone) {
            if (phone.length > maxPhoneLength) {
                throw new Error(MESSAGES.CLIENT.VALIDATION.PHONE_TOO_LONG(maxPhoneLength));
            }
        }
    }
}
