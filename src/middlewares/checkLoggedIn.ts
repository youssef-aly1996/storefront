import { Request, Response, NextFunction } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const loggedIN = req.isAuthenticated() && req.user;
  if (!loggedIN) {
    return res.status(401).json({
      error: "you need to login first",
    });
  }
  next();
}
