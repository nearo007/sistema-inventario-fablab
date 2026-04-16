export type CreateLoanDTO = {
    userId: number;
    itemId: number;
    loanDate: Date;
    dueDate: Date;
    returnDate?: Date | null;
};
