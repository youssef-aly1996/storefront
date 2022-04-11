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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user/user");
const auth_1 = require("../middlewares/auth");
const checkLoggedIn_1 = require("../middlewares/checkLoggedIn");
dotenv_1.default.config();
const userRouter = (0, express_1.Router)();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null, profile);
}
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    callbackURL: "/users/auth/google/callback",
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
}, verifyCallback));
passport_1.default.serializeUser((user, done) => {
    done(user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
userRouter.use(passport_1.default.initialize());
userRouter.use(passport_1.default.session());
const store = new user_1.UserStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const token = yield store.createUser(user);
        req.session.token = token;
        const stringToken = (0, jsonwebtoken_1.verify)(req.session.token, process.env.TOKEN_SECRET);
        console.log(stringToken);
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
const root = (req, res) => {
    res.status(200).json("hello my lovely user");
};
userRouter.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile"],
}));
userRouter.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/users",
    session: true,
}), (req, res) => {
    console.log("Google called us back!");
});
userRouter.get("/logout", (req, res) => {
    req.logOut();
    return res.redirect("/");
});
userRouter.get("/failure", function (req, res) {
    res.send("failed to authenticate");
});
userRouter.get("/secret", checkLoggedIn_1.isLoggedIn, function (req, res) {
    res.send("fuck this is secret");
});
userRouter.get("/", root);
userRouter.post("/signup", create);
userRouter.get("/get/:id", auth_1.validateAuth, show);
userRouter.get("/list", auth_1.validateAuth, index);
exports.default = userRouter;
