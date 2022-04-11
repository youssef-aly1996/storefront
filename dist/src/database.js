"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV, } = process.env;
function getClient() {
    let client = new pg_1.Pool();
    switch (ENV) {
        case "dev":
            client = new pg_1.Pool({
                host: POSTGRES_HOST,
                user: POSTGRES_USER,
                database: POSTGRES_DB,
                password: POSTGRES_PASSWORD,
                port: POSTGRES_PORT,
            });
            break;
        case "test":
            client = new pg_1.Pool({
                host: POSTGRES_HOST,
                user: POSTGRES_USER,
                database: POSTGRES_TEST_DB,
                password: POSTGRES_PASSWORD,
                port: POSTGRES_PORT,
            });
        case "production":
            client = new pg_1.Pool({
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
exports.getClient = getClient;
