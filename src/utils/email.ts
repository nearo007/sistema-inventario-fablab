export class Email {
    static validate(raw: string) {
        if (!raw || raw.trim() === '') {
            throw new Error('Email é obrigatório!');
        };

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
            throw new Error('Email invalido!');
        };
    }
}