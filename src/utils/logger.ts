import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
}

const level = () => {
    if (process.env.NODE_ENV === "production") {
        return "info";
    }
    return "debug";
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta"
}

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    }),
);

const logger = winston.createLogger({
    level: level(),
    format: format,
    transports: [
        new winston.transports.Console({
            level: level(),
            format: format,
        })
    ]
});

export { logger };