import type { LoginDTO } from "@modules/auth/auth.dtos.js";
import { handlePrismaError } from "@src/shared/utils/prisma.js";
import { LoginValidator } from "@modules/auth/validators/login.validator.js";
import { prisma } from "@src/lib/prisma.js";
import { MESSAGES } from "@src/constants/messages.js";
import { Bcrypt } from "@src/shared/utils/bcrypt.js";
import { TokenService } from "@src/shared/services/token.service.js";

class AuthService {
    async login(data: LoginDTO) {
        try {
            LoginValidator.validate(data);

            const { email, password } = data;

            const user = await prisma.user.findFirst({
                where: { email },
            });

            if (!user) {
                throw new Error(MESSAGES.USER.AUTH.INCORRECT_CREDENTIALS);
            }

            const correctPassword = await Bcrypt.comparePassword(
                password,
                user.passwordHash,
            );

            if (!correctPassword) {
                throw new Error(MESSAGES.USER.AUTH.INCORRECT_CREDENTIALS);
            }

            const { accessToken, refreshToken } = TokenService.generate({
                userId: user.id.toString(),
            });

            return {
                accessToken,
                refreshToken,
            };
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const authService = new AuthService();
export { authService };
