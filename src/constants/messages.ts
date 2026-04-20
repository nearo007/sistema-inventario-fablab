export const MESSAGES = {
  USER: {
    NOT_FOUND: {
      ANY: "Nenhum usuário cadastrado.",
      GENERAL: "Usuário não encontrado.",
      BY_ID: "Não foi possível encontrar um usuário com esse ID.",
      BY_NAME: "Não foi possível encontrar um usuário com esse nome.",
    },
    CONFLICT: {
      NAME_EXISTS: "Este nome de usuário já está em uso.",
      EMAIL_EXISTS: "Este e-mail já está cadastrado no sistema.",
    },
    VALIDATION: {
      EMAIL_REQUIRED: "O e-mail é obrigatório.",
      EMAIL_INVALID: "O e-mail é inválido.",
    },
  },
} as const;