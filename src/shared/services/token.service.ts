import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "1h";

export class TokenService {
    static generate(payload: { id: string; email: string }) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
    }

    static verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}