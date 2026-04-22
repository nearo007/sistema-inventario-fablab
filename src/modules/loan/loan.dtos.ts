export type CreateLoanDTO = {
    userId: number;
    itemId: number;
    loanDate: string;
    dueDate: string;
    returnDate?: string;
};

export type UpdateLoanDTO = {
    loanDate?: string;
    dueDate?: string;
    returnDate?: string;
};