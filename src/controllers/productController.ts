import { Request, Response, Router } from "express";
import { validateAuth } from "../middlewares/auth";
import { Product, producStore } from "../models/product/product";

const store = new producStore();

const productRouter: Router = Router();
const index = async (_: Request, res: Response) => {
  try {
    const products = await store.getProducts();
    res.status(200).send(products);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const show = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const product = await store.getProductById(id);
    res.status(200).send(product);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const createdProduct = await store.createProduct(product);
    res.status(201).json(createdProduct);
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

productRouter.get("/list", index);
productRouter.get("/get/:id", show);
productRouter.post("/create", validateAuth, create);

export default productRouter;
