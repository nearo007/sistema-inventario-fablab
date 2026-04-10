import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import { itemRouter } from './routes/itemRoutes.js';
import { loanRouter } from './routes/loanRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use('/u', userRouter);
app.use('/i', itemRouter);
app.use('/l', loanRouter);

app.use(errorHandler);

export { app };