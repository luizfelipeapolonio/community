import { Router, Request, Response } from "express";

export class UserRoutes {
    private router = Router();

    routes() {
        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("User Routes is working");
        });

        return this.router;
    }
}