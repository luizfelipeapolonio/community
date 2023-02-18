import { Router, Request, Response } from "express";

// Middlewares
import { HandleValidation } from "../middlewares/handleValidation";
import { AuthGuard } from "../middlewares/authGuard";
import { ImageUpload } from "../middlewares/imageUpload";

// Controllers
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private router = Router();

    routes() {
        const validate = new HandleValidation();
        const user = new UserController();
        const auth = new AuthGuard();
        const image = new ImageUpload();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("User routes is working");
        });
        this.router.post("/register", validate.userRegisterValidation, user.register);
        this.router.post("/login", validate.userLoginValidation, user.login);
        this.router.get("/profile", auth.execute, user.getCurrentUser);
        this.router.patch(
            "/", 
            auth.execute, 
            image.imageUpload().single("profileImage"), 
            validate.userUpdateValidation, 
            user.update
        );
        this.router.get("/:id", user.getUserById);

        return this.router;
    }
}