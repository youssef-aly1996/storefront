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
const user_1 = require("./user");
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../../middlewares/auth");
dotenv_1.default.config();
const userRouter = (0, express_1.Router)();
const store = new user_1.UserStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const token = yield store.createUser(user);
        res.status(201).json(token);
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
        const user = yield store.getUserById(+id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error);
        return;
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).send(error);
        return;
    }
});
userRouter.post("/signup", create);
userRouter.get("/get/:id", auth_1.validateAuth, show);
userRouter.get("/list", auth_1.validateAuth, index);
exports.default = userRouter;
