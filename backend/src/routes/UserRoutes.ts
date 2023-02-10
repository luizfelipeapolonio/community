import { Router, Request, Response } from "express";

// Middlewares
import { HandleValidation } from "../middlewares/handleValidation";

// Controllers
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private router = Router();

    routes() {
        const validate = new HandleValidation();
        const user = new UserController();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("User Routes is working");
        });
        this.router.post("/register", validate.userValidation, user.register);

        return this.router;
    }
}