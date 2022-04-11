"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = require("../../database");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const { BCRYP_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (first_name, last_name, password) 
        VALUES($1, $2, $3) returning id`;
                const conn = yield (0, database_1.getClient)().connect();
                const hashedPassword = (0, bcrypt_1.hashSync)(u.password + BCRYP_PASSWORD, parseInt(SALT_ROUNDS));
                const result = yield conn.query(sql, [
                    u.first_name,
                    u.last_name,
                    hashedPassword,
                ]);
                const id = result.rows[0];
                conn.release();
                const jwtToken = (0, jsonwebtoken_1.sign)({ firstName: u.first_name, userId: id }, process.env.TOKEN_SECRET);
                return jwtToken;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM users;`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`could not get users ${error}`);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM users WHERE id = $1;`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
