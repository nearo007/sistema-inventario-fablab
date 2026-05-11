export type ClientDTO = {
    name: string;
    email: string;
    phone: string | null;
};

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
