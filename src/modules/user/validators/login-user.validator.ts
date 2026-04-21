import { EmailValidator } from "../../../shared/utils/validators/email.validator.js";
import { PasswordValidator } from "../../../shared/utils/validators/password.validator.js";
import type { LoginUserDTO } from "../user.dtos.js";

export class LoginUserValidator {
    static validate(data: LoginUserDTO) {
        EmailValidator.validate(data.email);
        PasswordValidator.validateLogin(data.password);
    }
}

