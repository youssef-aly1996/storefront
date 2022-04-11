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
const order_1 = require("../models/order/order");
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../middlewares/auth");
const ordersRouter = (0, express_1.Router)();
const store = new order_1.orderStore();
dotenv_1.default.config();
const showUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield store.getUserOrders(id);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, jsonwebtoken_1.verify)(req.session.token, process.env.TOKEN_SECRET);
    const order = {
        user_id: payload.userId.id,
        status: req.body.status,
        totalPrice: 10,
    };
    try {
        const createdOrder = yield store.makeOrder(order);
        req.session.oid = createdOrder.id;
        res.status(201).json(createdOrder);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quantity = parseInt(req.query.qt);
    const order_id = +req.session.oid;
    const product_id = req.query.pid;
    try {
        const createdProduct = yield store.addProduct(quantity, order_id, +product_id);
        yield store.updateOrderPrice(order_id);
        res.status(201).json(createdProduct);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
ordersRouter.get("/:id", auth_1.validateAuth, showUserOrders);
ordersRouter.post("/create", create);
ordersRouter.post("/cart", addProduct);
exports.default = ordersRouter;
