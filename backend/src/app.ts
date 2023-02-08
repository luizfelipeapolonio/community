import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import path from "node:path";
import cors from "cors";
import router from "./routes/Router";

class App {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Solve CORS
        this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

        // Load routes
        this.app.use(router);

        this.startApp();
    }   

    private startApp(): void {
        const port = process.env.PORT;

        this.app.listen(port, () => {
            console.log(`Aplicação rodando na porta: ${port}`);
        });
    }
}

new App();

