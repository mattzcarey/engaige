// scripts/migrate.js
import { createPool } from "@vercel/postgres";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

config();

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

async function runMigrations() {
  const migrationFiles = fs
    .readdirSync(path.join(process.cwd(), "migrations"))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    console.log(`Running migration: ${file}`);
    const sql = fs.readFileSync(
      path.join(process.cwd(), "migrations", file),
      "utf8"
    );
    try {
      await pool.query(sql);
      console.log(`Migration ${file} completed successfully.`);
    } catch (error) {
      console.error(`Error running migration ${file}:`, error);
      process.exit(1);
    }
  }

  await pool.end();
}

runMigrations().catch(console.error);
