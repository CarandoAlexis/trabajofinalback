import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const selectedDAO = process.env.DAO_TYPE || "mongo"; 
export const mongoUrl = process.env.MONGO_DB_CONNECTION;
export const sessionSecret = process.env.SESSION_SECRET;