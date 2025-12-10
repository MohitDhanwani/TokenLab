import dotenv from "dotenv";
dotenv.config();
export const PORT = Number(process.env.PORT) || 4000;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const DATABASE_URL = process.env.DATABASE_URL;
//# sourceMappingURL=index.js.map