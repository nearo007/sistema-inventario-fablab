import { prisma } from "../../lib/prisma.js";
import { Bcrypt } from "../../shared/utils/bcrypt.js";
import { EmailValidator } from "../../shared/utils/validators/email.validator.js";
import { PasswordValidator } from "../../shared/utils/validators/password.validator.js";
import { handlePrismaError } from "../../shared/utils/prisma.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dtos.js";
import { CreateUserValidator } from "./validators/create-user.validator.js";
class UserService {
    async create(data: CreateUserDTO) {
        try {
            const { username, email, password, passwordConfirm } = data;
            
            CreateUserValidator.validate(data);
            const passwordHash = await Bcrypt.hashPassword(password);
            
            const hashedData = { username, email, passwordHash };
            const user = await prisma.user.create({
                data: hashedData,
            });

            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async getAll() {
        try {
            const allUsers = await prisma.user.findMany();
            return allUsers;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async updateById(id: number, data: UpdateUserDTO) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data,
            });
            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async deleteById(id: number) {
        try {
            const user = await prisma.user.delete({
                where: { id },
            });
            return user;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const userService = new UserService();
export { userService };

