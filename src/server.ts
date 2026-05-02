import { app } from '@src/app.js';
import dotenv from 'dotenv';
import { MESSAGES } from './constants/messages.js';

dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});