export type CreateClientDTO = {
    name: string;
    email: string;
    phone?: string;
};

export type UpdateClientDTO = {
    name?: string;
    email?: string;
    phone?: string;
};
