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
Object.defineProperty(exports, "__esModule", { value: true });
exports.producStore = void 0;
const database_1 = require("../../database");
class producStore {
    createProduct(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `insert into products (name, price, category) 
    values ($1, $2, $3) returning *`;
            try {
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query, [p.name, p.price, p.category]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`error creating product, ${error}`);
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from products where id= $1`;
            try {
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`error finding product with id${id}, ${error}`);
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from products`;
            try {
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`error finding all product, ${error}`);
            }
        });
    }
}
exports.producStore = producStore;
