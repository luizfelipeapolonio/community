import { Router, Request, Response } from "express";

// Middlewares
import { HandleValidation } from "../middlewares/handleValidation";
import { AuthGuard } from "../middlewares/authGuard";

// Controllers
import { UserController } from "../controllers/UserController";

import { config } from "../config/default";
import Logger from "../config/logger";
import jwt, {JwtPayload}from "jsonwebtoken";

export class UserRoutes {
    private router = Router();

    routes() {
        const validate = new HandleValidation();
        const user = new UserController();
        const auth = new AuthGuard();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("User routes is working");
        });
        this.router.post("/register", validate.userRegisterValidation, user.register);
        this.router.post("/login", validate.userLoginValidation, user.login);
        this.router.get("/profile", auth.execute, user.getCurrentUser);

        return this.router;
    }
}