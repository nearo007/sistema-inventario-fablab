import express from 'express';
import cors from 'cors';

import { errorHandler } from '@middlewares/errorHandler.js';
import { userRouter } from '@user/user.routes.js';
import { itemRouter } from '@item/item.routes.js';
import { loanRouter } from '@loan/loan.routes.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use('/u', userRouter);
app.use('/i', itemRouter);
app.use('/l', loanRouter);

app.use(errorHandler);

export { app };