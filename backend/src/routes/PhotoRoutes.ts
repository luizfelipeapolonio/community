import { Router, Request, Response } from "express";

export class PhotoRoutes {
    private router = Router();

    routes() {
        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Photo Routes is working!");
        });

        return this.router;
    }
}