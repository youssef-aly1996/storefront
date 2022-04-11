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
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const product_1 = require("../product/product");
const store = new product_1.producStore();
const productRouter = (0, express_1.Router)();
const index = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.getProducts();
        res.status(200).send(products);
        return;
    }
    catch (error) {
        res.status(400).send(error);
        return;
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield store.getProductById(id);
        res.status(200).send(product);
        return;
    }
    catch (error) {
        res.status(400).send(error);
        return;
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const createdProduct = yield store.createProduct(product);
        res.status(201).json(createdProduct);
        return;
    }
    catch (error) {
        res.status(400).send(error);
        return;
    }
});
productRouter.get("/list", index);
productRouter.get("/get/:id", show);
productRouter.post("/create", auth_1.validateAuth, create);
exports.default = productRouter;
