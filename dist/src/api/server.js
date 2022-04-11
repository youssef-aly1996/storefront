"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userController_1 = __importDefault(require("../controllers/userController"));
const productController_1 = __importDefault(require("../controllers/productController"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const cookieSession = require("cookie-session");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [
        process.env.COOKIE_KEY_1,
        process.env.COOKIE_KEY_2,
    ],
}));
app.use("/users", userController_1.default);
app.use("/products", productController_1.default);
app.use("/orders", orderController_1.default);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
https_1.default
    .createServer({
    cert: (0, fs_1.readFileSync)("cert.pem"),
    key: (0, fs_1.readFileSync)("key.pem"),
}, app)
    .listen(port, () => {
    console.log(`starting app on: ${port}`);
});
exports.default = app;
