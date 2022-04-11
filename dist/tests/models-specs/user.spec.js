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
const user_1 = require("../../src/models/user/user");
const user = new user_1.UserStore();
describe("User Model", () => {
    it("should have a getUsers  method", () => {
        expect(user.getAllUsers).toBeDefined();
    });
    it("should have a getUserById method", () => {
        expect(user.getUserById).toBeDefined();
    });
    it("should have a createUser method", () => {
        expect(user.createUser).toBeDefined();
    });
    it("should create a user with token to true using createUser method", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user.createUser({
            first_name: "sayed",
            last_name: "rweny",
            password: "thisismeenow2022#",
        });
        expect(token).toBeDefined();
    }));
    it("should return the correct user using getUserById method", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 4;
        const result = yield user.getUserById(id);
        console.log(result);
        expect(result.id).toEqual(id);
        expect(result.first_name).toEqual("sayed");
        expect(result.last_name).toEqual("rweny");
        expect(result.password.length).toBeGreaterThanOrEqual(60);
    }));
    it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = 4;
        const result = yield user.getAllUsers();
        expect(result[3].id).toEqual(id);
        expect(result[3].first_name).toEqual("sayed");
        expect(result[3].last_name).toEqual("rweny");
    }));
});
