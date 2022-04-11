import { Product, producStore } from "../../src/models/product/product";
const product = new producStore();
describe("Product Model", () => {
  it("should have a createProduct  method", () => {
    expect(product.createProduct).toBeDefined();
  });

  it("should have a getProductById method", () => {
    expect(product.getProductById).toBeDefined();
  });
  it("should have a getProducts method", () => {
    expect(product.getProducts).toBeDefined();
  });

  it("should create a product using createProduct method", async () => {
    const result: Product = await product.createProduct({
      name: "iPhone",
      price: 645,
      category: "phone",
    });
    expect(result).toEqual({
      id: 4,
      name: "iPhone",
      price: 645,
      category: "phone",
    });
  });
  it("should return a list of products using getProducts", async () => {
    const result: Product[] = await product.getProducts();
    expect(result[3]).toEqual({
      id: 4,
      name: "iPhone",
      price: 645,
      category: "phone",
    });
  });

  it("should return the correct product using getProductById", async () => {
    const result: Product = await product.getProductById("4");
    expect(result).toEqual({
      id: 4,
      name: "iPhone",
      price: 645,
      category: "phone",
    });
  });
});
