import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import { itemRouter } from './routes/itemRoutes.js';
import { loanRouter } from './routes/loanRoutes.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use('/u', userRouter);
app.use('/i', itemRouter);
app.use('/l', loanRouter);

export { app };