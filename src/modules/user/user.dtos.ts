export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
    name?: string;
    email?: string;
};

export type UpdateUserPasswordDTO = {
  password: string;
}