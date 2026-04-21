export const MESSAGES = {
    USER: {
        NOT_FOUND: {
            GENERAL: "Nenhum usuário cadastrado.",
            BY_ID: "Não foi possível encontrar um usuário com esse ID.",
            BY_USERNAME:
                "Não foi possível encontrar um usuário com esse usuário.",
            BY_EMAIL : "Não foi possível encontrar um usuário com esse email.",
        },
        CONFLICT: {
            USERNAME_EXISTS: "Este nome de usuário já está em uso.",
            EMAIL_EXISTS: "Este e-mail já está cadastrado no sistema.",
            PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem.",
            INCORRECT_PASSWORD: "Senha incorreta."
        },
        VALIDATION: {
            USERNAME_REQUIRED: "O usuário é obrigatório",
            USERNAME_INVALID: "O usuário é inválido",
            USERNAME_TOO_SHORT: (num: number) =>
                `O usuário deve conter pelo menos ${num} caracteres.`,
            USERNAME_TOO_LONG: (num: number) =>
                `O usuário ter no máximo ${num} caracteres.`,
            EMAIL_REQUIRED: "O e-mail é obrigatório.",
            EMAIL_INVALID: "O e-mail é inválido.",
            PASSWORD_REQUIRED: "A senha é obrigatória",
            PASSWORD_INVALID: "A senha é inválida",
            PASSWORD_TOO_SHORT: (num: number) =>
                `A senha deve conter pelo menos ${num} caracteres válidos.`,
            PASSWORD_TOO_LONG: (num: number) =>
                `A senha deve ter no máximo ${num} caracteres.`,
        },
        AUTH: {
            INCORRECT_CREDENTIALS: "Credenciais inválidas."
        }
    },
} as const;
