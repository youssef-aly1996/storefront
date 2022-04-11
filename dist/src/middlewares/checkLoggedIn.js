"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
function isLoggedIn(req, res, next) {
    const loggedIN = req.isAuthenticated() && req.user;
    if (!loggedIN) {
        return res.status(401).json({
            error: "you need to login first",
        });
    }
    next();
}
exports.isLoggedIn = isLoggedIn;
