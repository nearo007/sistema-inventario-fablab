export type LoanDTO = {
    clientId: number;
    itemId: number;
    loanDate: string;
    dueDate: string;
    loanQuantity: number;
    returnDate?: string;
};

export type CreateLoanDTO = {
    clientId: number;
    itemId: number;
    loanDate: string;
    dueDate: string;
    loanQuantity: number;
    returnDate?: string;
};

export type UpdateLoanDTO = {
    loanDate?: string;
    dueDate?: string;
    returnDate?: string;
};
