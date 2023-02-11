import mongoose from "mongoose";
import { config } from "./default";
import Logger from "./logger";

export class DBConnection {
    private dbUri: string = config.dbUri;

    async connect(): Promise<void> {
        try {
            mongoose.set("strictQuery", false);

            await mongoose.connect(this.dbUri);
            Logger.info("Conexão estabelecida com sucesso!");
        } catch(error: any) {
            Logger.error(
                "Não foi possível conectar! --> " + `Erro: ${error.message}`
            );
            process.exit(1);
        }
    }
}