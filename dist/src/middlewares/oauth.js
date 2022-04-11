"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
// import { Request, Response, NextFunction } from "express";
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};
function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
}
function authenticate(passport) {
    passport.use(new passport_google_oauth20_1.Strategy({
        callbackURL: "/users/auth/google/callback",
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
    }, verifyCallback));
}
exports.authenticate = authenticate;
