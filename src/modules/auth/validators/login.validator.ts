import { EmailValidator } from "@shared/utils/validators/email.validator.js";
import { PasswordValidator } from "@shared/utils/validators/password.validator.js";
import type { LoginDTO } from "@modules/auth/auth.dtos.js";

export class LoginValidator {
    static validate(data: LoginDTO) {
        EmailValidator.validate(data.email);
        PasswordValidator.validate(data.password);
    }
}

