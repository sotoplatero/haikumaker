import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: process.env.ASTRO_DB_REMOTE_URL,
  authToken: process.env.ASTRO_DB_APP_TOKEN,
});