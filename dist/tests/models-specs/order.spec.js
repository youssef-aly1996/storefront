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
const order_1 = require("../../src/models/order/order");
const user_1 = require("../../src/models/user/user");
const product_1 = require("../../src/models/product/product");
const order = new order_1.orderStore();
describe("Order Model", () => {
    it("makOerder method should be defined", () => {
        expect(order.makeOrder).toBeDefined();
    });
    it("makeOrder method should be defined", () => {
        expect(order.getUserOrders).toBeDefined();
    });
    describe("order working", () => {
        const user = new user_1.UserStore();
        const products = new product_1.producStore();
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user.createUser({
                first_name: "youssef",
                last_name: "aly",
                password: "joejoejoejoe",
            });
            yield products.createProduct({
                name: "shirt",
                price: 500,
                category: "clothing",
            });
        }));
        it("should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield order.makeOrder({
                user_id: 3,
                status: "active",
                totalPrice: 700,
            });
            expect(result.id).toEqual(2);
            expect(+result.user_id).toEqual(3);
            expect(result.status).toEqual("active");
        }));
        it("should insert product list to an order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield order.addProduct(3, 1, 1);
            expect(result.id).toEqual(1);
            expect(result.quantity).toEqual(3);
            expect(result.product_id).toEqual(1);
            expect(result.order_id).toEqual(1);
        }));
        it("should return a specific user orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield order.getUserOrders("3");
            expect(result[0].id).toEqual(2);
            expect(+result[0].user_id).toEqual(3);
            expect(result[0].status).toEqual("active");
        }));
    });
});
