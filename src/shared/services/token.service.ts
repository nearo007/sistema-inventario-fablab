import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as any; 
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN as any;
export class TokenService {
    static generate(data: {userId: string}) {
        const accessToken = jwt.sign({ sub: data.userId }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({ sub: data.userId }, JWT_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRES_IN,
        });

        return { accessToken, refreshToken };
    }

    static verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}
