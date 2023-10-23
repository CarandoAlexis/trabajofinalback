import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const selectedDAO = process.env.DAO_TYPE || "mongo";
export const mongoUrl = process.env.MONGO_DB_CONNECTION;
export const sessionSecret = process.env.SESSION_SECRET;
export const emailUser = process.env.EMAIL_USER;
export const emailPassword = process.env.EMAIL_PASS;
export const serverPort = process.env.PORT;
export const githubclientID = process.env.GITHUB_CLIENT_ID;
export const githubclientSecret = process.env.GITHUB_CLIENT_SECRET;
export const callbackGITH = process.env.CALLBACK_URL;
export const basePrefix = process.env.BASE_PREFIX || "api"; 