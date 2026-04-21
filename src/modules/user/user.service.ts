import { MESSAGES } from "../../constants/messages.js";
import { prisma } from "../../lib/prisma.js";
import { Bcrypt } from "../../shared/utils/bcrypt.js";
import { handlePrismaError } from "../../shared/utils/prisma.js";
import type {
    CreateUserDTO,
    LoginUserDTO,
    UpdateUserDTO,
} from "./user.dtos.js";
import { CreateUserValidator } from "./validators/create-user.validator.js";
import { LoginUserValidator } from "./validators/login-user.validator.js";
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

    async login(data: LoginUserDTO) {
        try {
            const { email, password } = data;

            LoginUserValidator.validate(data);

            const user = await prisma.user.findFirst({
                where: { email },
            });

            if (!user) {
                throw new Error(MESSAGES.USER.NOT_FOUND.BY_EMAIL);
            }

            const passwordMatch = await Bcrypt.comparePassword(
                password,
                user.passwordHash,
            );

            if (!passwordMatch) {
                throw new Error(MESSAGES.USER.CONFLICT.INCORRECT_PASSWORD);
            }
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
