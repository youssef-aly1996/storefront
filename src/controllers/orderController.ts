import { Order, orderStore } from "../models/order/order";
import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { verify, JwtPayload } from "jsonwebtoken";
import { validateAuth } from "../middlewares/auth";

const ordersRouter = Router();
const store = new orderStore();
dotenv.config();

const showUserOrders = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const orders = await store.getUserOrders(id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const payload = verify(
    req.session.token,
    process.env.TOKEN_SECRET
  ) as JwtPayload;
  const order: Order = {
    user_id: payload.userId.id,
    status: req.body.status,
    totalPrice: 10,
  };
  try {
    const createdOrder = await store.makeOrder(order);
    req.session.oid = createdOrder.id;
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = parseInt(req.query.qt as string);
  const order_id: number = +req.session.oid;
  const product_id: string = req.query.pid as string;

  try {
    const createdProduct = await store.addProduct(
      quantity,
      order_id,
      +product_id
    );
    await store.updateOrderPrice(order_id);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

ordersRouter.get("/:id", validateAuth, showUserOrders);
ordersRouter.post("/create", create);
ordersRouter.post("/cart", addProduct);

export default ordersRouter;
