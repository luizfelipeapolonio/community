import winston from "winston";
import { config } from "./default";

type LogOptions<T extends number | string> = {
    error: T,
    warn: T,
    info: T,
    http: T,
    debug: T
}

const levels: LogOptions<number> = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = (): string => {
    const env: string = config.env || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
}

const colors: LogOptions<string> = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
        return `${info.timestamp} - ${info.level} - ${info.message}`;
    })
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "log/error.log",
        level: "error"
    }),
    new winston.transports.File({ filename: "log/all.log" })
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default Logger;