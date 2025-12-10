import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/config/index"
import "dotenv/config.js"

console.log(DATABASE_URL);

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL ?? "",
  },
});
