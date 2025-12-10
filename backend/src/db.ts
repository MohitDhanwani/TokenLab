import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'
import { DATABASE_URL } from "./config/index.js"

const pool = new Pool({
    connectionString: DATABASE_URL
});

export const db = drizzle(pool);