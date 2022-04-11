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
exports.orderStore = void 0;
const database_1 = require("../../database");
class orderStore {
    getUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select * from orders  where user_id= $1`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query, [id]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`couldn't get orders for user ${id} ${error}`);
            }
        });
    }
    makeOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `insert into orders (user_id, status, total_price) 
      values ($1, $2, $3) returning *`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query, [
                    o.user_id,
                    o.status,
                    o.totalPrice,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`couldn't insert a new order ${error}`);
            }
        });
    }
    addProduct(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `insert into order_products (quantity, order_id, product_id) 
      values ($1, $2, $3) returning *`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query, [quantity, order_id, product_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`couldn't insert a new product to order ${error}`);
            }
        });
    }
    getSubTotal(oid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query1 = `select SUM(p.price) as subTotal
                      from order_products op
                      join products p on p.id = op.product_id
                      where order_id=$1`;
                const conn = yield (0, database_1.getClient)().connect();
                const result = yield conn.query(query1, [oid]);
                conn.release();
                const total = result.rows[0].subtotal;
                console.log(total);
                return total;
            }
            catch (error) {
                throw new Error(`couldn't get sub total ${error}`);
            }
        });
    }
    updateOrderPrice(oid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total = yield this.getSubTotal(oid);
                const query = `update orders set total_price=$1 where id=$2`;
                const conn = yield (0, database_1.getClient)().connect();
                yield conn.query(query, [total, oid]);
            }
            catch (error) {
                throw new Error(`couldn't update order price ${error}`);
            }
        });
    }
}
exports.orderStore = orderStore;
