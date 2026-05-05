import { MESSAGES } from "@src/constants/messages.js";
import { prisma } from "@lib/prisma.js";
import { Bcrypt } from "@shared/utils/bcrypt.js";
import { handlePrismaError } from "@shared/utils/prisma.js";
import type {
    CreateUserDTO,
    UpdateUserDTO,
    UpdateUserPasswordDTO,
} from "@modules/user/user.dtos.js";
import { CreateUserValidator } from "@src/modules/user/input-validation/create-user.validator.js";
import { PasswordValidator } from "@src/shared/utils/validators/password.validator.js";
class UserService {
    async create(data: CreateUserDTO) {
        const { username, email, password } = data;

        CreateUserValidator.validate(data);

        const passwordHash = await Bcrypt.hashPassword(password);

        const hashedData = { username, email, passwordHash };

        const user = await prisma.user.create({
            data: hashedData,
        });

        return user;
    }

    async getAll() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }

    async updateById(id: number, data: UpdateUserDTO) {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return user;
    }

    async updatePasswordById(id: number, data: UpdateUserPasswordDTO) {
        PasswordValidator.validate(data.password);

        return;
    }

    async deleteById(id: number) {
        const user = await prisma.user.delete({
            where: { id },
        });

        return user;
    }
}

const userService = new UserService();
export { userService };
