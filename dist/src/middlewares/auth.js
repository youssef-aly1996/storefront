"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateAuth = (req, res, next) => {
    // const authorizationHeader: string | undefined = req.headers.authorization;
    // const token: string = authorizationHeader
    //   ? authorizationHeader.split(" ")[1]
    //   : "";
    const token = req.session.token || "";
    if (token === "") {
        res.status(401).send(`Invalid token`);
        return;
    }
    try {
        (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).send(`Invald token ${error}`);
        return;
    }
};
exports.validateAuth = validateAuth;
