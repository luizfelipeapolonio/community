import { Router, Request, Response } from "express";

export class PostRoutes {
    private router = Router();

    routes() {
        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Post Routes is working!");
        });

        return this.router;
    }
}