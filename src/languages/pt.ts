export const PT_MESSAGES = {
    USER: {
        NOT_FOUND: {
            GENERAL: "Nenhum usuário cadastrado.",
            BY_ID: "Não foi possível encontrar um usuário com esse ID.",
            BY_USERNAME:
                "Não foi possível encontrar um usuário com esse usuário.",
            BY_EMAIL: "Não foi possível encontrar um usuário com esse email.",
        },
        CONFLICT: {
            USERNAME_EXISTS: "Este nome de usuário já está em uso.",
            EMAIL_EXISTS: "Este e-mail já está cadastrado no sistema.",
            PASSWORDS_DO_NOT_MATCH: "As senhas não coincidem.",
            INCORRECT_PASSWORD: "Senha incorreta.",
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
            INCORRECT_CREDENTIALS: "Credenciais inválidas.",
        },
    },

    ITEM: {
        VALIDATION: {
            NAME_REQUIRED: "O nome do item é obrigatório.",
            NAME_TOO_SHORT: (num: number) =>
                `O nome do item deve conter pelo menos ${num} caracteres.`,
            NAME_TOO_LONG: (num: number) =>
                `O nome do item deve ter no máximo ${num} caracteres.`,

            CATEGORY_TOO_LONG: (num: number) =>
                `A categoria deve ter no máximo ${num} caracteres.`,

            QUANTITY_REQUIRED: "A quantidade total é obrigatória.",
            QUANTITY_INVALID: "A quantidade deve ser um número válido.",
            QUANTITY_NEGATIVE: "A quantidade não pode ser negativa.",

            LOCATION_REQUIRED: "A localização é obrigatória.",
            LOCATION_TOO_LONG: (num: number) =>
                `A localização deve ter no máximo ${num} caracteres.`,
        },
    },
} as const;