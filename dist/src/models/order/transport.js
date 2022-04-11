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
const order_1 = require("./order");
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const ordersRouter = (0, express_1.Router)();
const store = new order_1.orderStore();
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
    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const createdOrder = yield store.makeOrder(order);
        res.status(201).json(createdOrder);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
ordersRouter.get("/:id", auth_1.validateAuth, showUserOrders);
ordersRouter.post("/create", create);
exports.default = ordersRouter;
