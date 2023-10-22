import winston from "winston";

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  fatal: "red",
  error: "red",
  warning: "yellow",
  info: "green",
  http: "green",
  debug: "blue",
};

winston.addColors(colors);

const nodeEnv = process.env.NODE_ENV || "development";
const logLevel = nodeEnv === "development" || nodeEnv === "test" ? "debug" : "info";

const logger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  defaultMeta: { service: nodeEnv },
  transports: [
    new winston.transports.Console({
      level: logLevel,
    }),
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),
  ],
});

// Solo para filtrar mensajes de info en producción ni idea si es buena practica o no solo probando un poco de logger si se necesita depurar desde este nivel debo eliminar esta linea debajo nada mas
if (nodeEnv === "production") {
  logger.transports[0].level = "warn";
}

export default logger;