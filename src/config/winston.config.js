import winston from "winston";

const logger = winston.createLogger({
    level: "error",

    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack || ""}\n`;
        })
    ),

    transports: [
        new winston.transports.File({
            filename: "logs/errors.txt"
        })
    ]
});

export default logger;