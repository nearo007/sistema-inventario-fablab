import crypto from "crypto";

export class Crypto {
    static hashToken(token: string) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }
}