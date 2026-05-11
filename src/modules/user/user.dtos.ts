export type UserDTO = {
    username: string;
    email: string;
};

export type CreateUserDTO = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type UpdateUserDTO = {
    username?: string;
    email?: string;
};

export type UpdateUserPasswordDTO = {
    password: string;
};
