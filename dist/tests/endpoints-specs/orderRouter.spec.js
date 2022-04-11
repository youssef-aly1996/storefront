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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/api/server"));
const request = (0, supertest_1.default)(server_1.default);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9tIG5hc3J0IiwibGFzdE5hbWUiOiJkM2QzIn0sImlhdCI6MTY0Njc3NzAxMX0.5JAb5JvjnfTZwgDECHzYOWcNyTIVVWwB1w-49-_fRUU";
describe("testing order endpoints", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .post("/users/signup")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({ first_name: "om nasrt", last_name: "d3d3", password: "12345" });
        yield request
            .post("/products/create")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .send({ name: "hummer", price: 580, category: "home" });
    }));
    it("should create a new order and response with 201 code status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/orders/create")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({ product_id: 1, quantity: 5, user_id: 1, status: "active" });
        expect(response.status).toBe(201);
    }));
    it("should retrieve an order for a user and response with 200 code", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/orders/1")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
});
