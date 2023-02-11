import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import path from "node:path";
import cors from "cors";

import router from "./routes/Router";

import { DBConnection } from "./config/db";

// DB and env variables configuration
import { config } from "./config/default";

// Winston and Morgan loggers
import Logger from "./config/logger";
import morganMiddleware from "./middlewares/morganMiddleware";

class App {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Solve CORS
        this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

        // Upload directory
        this.app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

        this.app.use(morganMiddleware);

        // Load routes
        this.app.use(router);

        this.startApp();
    }   

    private async startApp(): Promise<void> {
        const port: number | undefined = config.port ? parseInt(config.port) : undefined;

        if(port === undefined) {
            Logger.error("Porta não definida no arquivo .env");
            return;
        }

        await new DBConnection().connect();

        this.app.listen(port, () => {
            Logger.info(`Aplicação rodando na porta: ${port}`);
        });
    }
}

new App();

