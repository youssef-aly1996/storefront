import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const authorizationHeader: string | undefined = req.headers.authorization;
  // const token: string = authorizationHeader
  //   ? authorizationHeader.split(" ")[1]
  //   : "";
  const token: string = req.session.token || "";
  if (token === "") {
    res.status(401).send(`Invalid token`);
    return;
  }
  try {
    verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401).send(`Invald token ${error}`);
    return;
  }
};
