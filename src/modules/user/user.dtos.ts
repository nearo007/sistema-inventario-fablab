export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UpdateUserDTO = {
    name?: string;
    email?: string;
};

export type UpdateUserPasswordDTO = {
  password: string;
}