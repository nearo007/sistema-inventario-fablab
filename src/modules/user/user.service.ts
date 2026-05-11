import { MESSAGES } from "@src/constants/messages.js";
import { prisma } from "@lib/prisma.js";
import { Bcrypt } from "@shared/utils/bcrypt.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import type {
    UserDTO,
    CreateUserDTO,
    UpdateUserDTO,
    UpdateUserPasswordDTO,
} from "@modules/user/user.dtos.js";
import { CreateUserValidator } from "@src/modules/user/input-validation/create-user.validator.js";
import { PasswordValidator } from "@src/shared/utils/validators/password.validator.js";
class UserService {
    async create(data: CreateUserDTO): Promise<UserDTO> {
        const { username, email, password } = data;

        CreateUserValidator.validate(data);

        const passwordHash = await Bcrypt.hashPassword(password);

        const hashedData = { username, email, passwordHash };

        const user = await prisma.user.create({
            data: hashedData,
        });

        return user;
    }

    async list(): Promise<UserDTO[]> {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    async getById(id: number): Promise<UserDTO> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }

    async updateById(id: number, data: UpdateUserDTO): Promise<UserDTO> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return user;
    }

    async updatePasswordById(
        id: number,
        data: UpdateUserPasswordDTO,
    ): Promise<void> {
        PasswordValidator.validate(data.password);

        return;
    }

    async deleteById(id: number): Promise<void> {
        await prisma.user.delete({
            where: { id },
        });

        return;
    }
}

const userService = new UserService();
export { userService };
