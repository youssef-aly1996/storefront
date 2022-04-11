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
const product_1 = require("../../src/models/product/product");
const product = new product_1.producStore();
describe("Product Model", () => {
    it("should have a createProduct  method", () => {
        expect(product.createProduct).toBeDefined();
    });
    it("should have a getProductById method", () => {
        expect(product.getProductById).toBeDefined();
    });
    it("should have a getProducts method", () => {
        expect(product.getProducts).toBeDefined();
    });
    it("should create a product using createProduct method", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.createProduct({
            name: "iPhone",
            price: 645,
            category: "phone",
        });
        expect(result).toEqual({
            id: 4,
            name: "iPhone",
            price: 645,
            category: "phone",
        });
    }));
    it("should return a list of products using getProducts", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.getProducts();
        expect(result[3]).toEqual({
            id: 4,
            name: "iPhone",
            price: 645,
            category: "phone",
        });
    }));
    it("should return the correct product using getProductById", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.getProductById("4");
        expect(result).toEqual({
            id: 4,
            name: "iPhone",
            price: 645,
            category: "phone",
        });
    }));
});
