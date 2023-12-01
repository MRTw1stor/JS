import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "library_practica",
    port: 5432
});
