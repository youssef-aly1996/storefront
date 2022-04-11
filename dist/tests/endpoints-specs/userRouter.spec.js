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
describe("testing user endpoints", () => {
    it("should create a new user and response with 201 code status", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/users/signup")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send({ first_name: "om nasrt", last_name: "d3d3", password: "12345" });
        expect(response.status).toBe(201);
    }));
    it("should retrieve a user with id and response with 200 code", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/users/get/1")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
    it("should retrieve all users and response with 200 code", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/users/list")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
});
