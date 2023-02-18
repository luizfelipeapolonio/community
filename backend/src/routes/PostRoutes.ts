import { Router, Request, Response } from "express";

// Middlewares
import { HandleValidation } from "../middlewares/handleValidation";
import { ImageUpload } from "../middlewares/imageUpload";

// Middlewares
import { AuthGuard } from "../middlewares/authGuard";

// Controllers
import { PostController } from "../controllers/PostController";

export class PostRoutes {
    private router = Router();

    routes() {
        const auth = new AuthGuard();
        const image = new ImageUpload();
        const validate = new HandleValidation();
        const post = new PostController();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Post Routes is working!");
        });
        this.router.post(
            "/", 
            auth.execute, 
            image.imageUpload().single("image"), 
            validate.postCreateValidation, 
            post.createPost
        );
        this.router.delete("/:id", auth.execute, post.deletePost);

        return this.router;
    }
}