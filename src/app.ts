import express from 'express';
import cors from 'cors';
import router from './routes/userRoutes';

const app = express();

app.use(cors());

app.use('/u', router);

export default app;