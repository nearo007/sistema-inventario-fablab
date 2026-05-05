import type { LoginDTO } from "@modules/auth/auth.dtos.js";
import { handlePrismaError } from "@src/shared/utils/prisma.js";
import { LoginValidator } from "@src/modules/auth/input-validation/login.validator.js";
import { prisma } from "@src/lib/prisma.js";
import { MESSAGES } from "@src/constants/messages.js";
import { Bcrypt } from "@src/shared/utils/bcrypt.js";
import { TokenService } from "@src/shared/services/token.service.js";
import { Crypto } from "@src/shared/utils/crypto.js";

class AuthService {
    async login(data: LoginDTO) {
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

        const hashedRefreshToken = Crypto.hashToken(tokens.refreshToken);

        const authToken = await prisma.authToken.create({
            data: {
                userId: user.id,
                refreshTokenHash: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // TODO: move to env
            },
        });

        return tokens;
    }

    async refresh(refreshToken: string) {
        const hashed = Crypto.hashToken(refreshToken);

        const token = await prisma.authToken.findFirst({
            where: {
                refreshTokenHash: hashed,
                revoked: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!token) {
            throw new Error("Refresh token inválido");
        }

        const newTokens = TokenService.generate({
            userId: token.userId.toString(),
        });

        const result = await prisma.$transaction(async (tx) => {
            const revokedToken = await tx.authToken.update({
                where: { id: token.id },
                data: { revoked: true },
            });

            const newAuthToken = await tx.authToken.create({
                data: {
                    userId: token.userId,
                    refreshTokenHash: Crypto.hashToken(newTokens.refreshToken),
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // TODO: move to env
                },
            });

            return { revokedToken, newAuthToken };
        });

        return newTokens;
    }
}

const authService = new AuthService();
export { authService };
