import { Router } from "express";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);

export { authRouter };
