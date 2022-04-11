import https from "https";
import { readFileSync } from "fs";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "../controllers/userController";
import productRouter from "../controllers/productController";
import ordersRouter from "../controllers/orderController";
const cookieSession = require("cookie-session");

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [
      process.env.COOKIE_KEY_1 as string,
      process.env.COOKIE_KEY_2 as string,
    ],
  })
);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

https
  .createServer(
    {
      cert: readFileSync("cert.pem"),
      key: readFileSync("key.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`starting app on: ${port}`);
  });

export default app;
