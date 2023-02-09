import express from "express";

// API Routes
import { UserRoutes } from "./UserRoutes";
import { PostRoutes } from "./PostRoutes";

class Router {
    private router = express();

    execute() {
        this.router.use("/api/users", new UserRoutes().routes());
        this.router.use("/api/posts", new PostRoutes().routes());

        return this.router;
    }
}

export default new Router().execute();