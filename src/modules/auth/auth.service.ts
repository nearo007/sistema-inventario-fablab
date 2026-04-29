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

            const tokens = TokenService.generate({
                userId: user.id.toString(),
            });

            return tokens;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }

    async refresh(refreshToken: string) {
        try {
            if (!refreshToken) {
                throw new Error("Refresh token ausente");
            }

            let payload: any;

            try {
                payload = TokenService.verify(refreshToken);
            } catch {
                throw new Error("Refresh token inválido ou expirado");
            }

            const userId =
                typeof payload.sub === "string" ? payload.sub : undefined;

            if (!userId) {
                throw new Error("Token inválido");
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            const tokens = TokenService.generate({
                userId,
            });

            return tokens;
        } catch (err: any) {
            handlePrismaError(err);
        }
    }
}

const authService = new AuthService();
export { authService };
