import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Neon is not configured. Set DATABASE_URL.");
  }
  return neon(databaseUrl);
}
