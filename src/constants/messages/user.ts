export const USER = {
    create: {
        name: {
            alreadyExists: "Esse usuário já foi cadastrado no sistema.",
        },
        email: {
            alreadyExists: "Esse email já foi cadastrado sistema.",
        },
    },
    read: {
        any: {
            notFound: "Nenhum usuário cadastrado.",
        },
        id: {
            notFound: "Não foi possível encontrar um usuário com esse id.",
        },
        name: {
            notFound: "Não foi possível encontrar um usuário com esse nome.",
        },
    },
    update: {
        name: {
            alreadyExists: "Esse usuário já foi cadastrado no sistema.",
        },
        email: {
            alreadyExists: "Esse email já foi cadastrado sistema.",
        },
    },
} as const;
