import { Pool, Connection } from "pg";
import dotenv from "dotenv";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

export function getClient(): Pool {
  let client: Pool = new Pool();
  switch (ENV) {
    case "dev":
      client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT as unknown as number,
      });
      break;
    case "test":
      client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT as unknown as number,
      });
    case "production":
      client = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    default:
      break;
  }
  return client;
}
