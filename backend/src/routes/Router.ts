import express from "express";

// API Routes
import { UserRoutes } from "./UserRoutes";
import { PhotoRoutes } from "./PhotoRoutes";

class Router {
    private router = express();

    execute() {
        this.router.use("/api/users", new UserRoutes().routes());
        this.router.use("/api/photos", new PhotoRoutes().routes());

        return this.router;
    }
}

export default new Router().execute();