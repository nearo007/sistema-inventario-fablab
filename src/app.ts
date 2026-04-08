import express from 'express';
import cors from 'cors';
import router from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use('/u', router);

export default app;