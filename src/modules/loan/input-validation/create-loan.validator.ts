import type { CreateLoanDTO } from "@modules/loan/loan.dtos.js";
import { MESSAGES } from "@src/constants/messages.js";
import { DateValidator } from "@src/shared/utils/validators/date.validator.js";
import { IdValidator } from "@src/shared/utils/validators/id.validator.js";
import { QuantityValidator } from "@src/shared/utils/validators/quantity.validator.js";

export class CreateLoanValidator {
    static validate(data: CreateLoanDTO) {
        IdValidator.validate(data.itemId);
        IdValidator.validate(data.userId);
        DateValidator.validate(data.loanDate, MESSAGES.FIELDS.LOAN_DATE);
        DateValidator.validate(data.dueDate, MESSAGES.FIELDS.DUE_DATE);
        QuantityValidator.validate(data.loanQuantity, 1);

        if (data.returnDate) {
            DateValidator.validate(data.returnDate, MESSAGES.FIELDS.RETURN_DATE);
        }
    }
}