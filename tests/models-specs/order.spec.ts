import { Order, OrderProducts, orderStore } from "../../src/models/order/order";
import { UserStore } from "../../src/models/user/user";
import { producStore } from "../../src/models/product/product";

const order = new orderStore();

describe("Order Model", () => {
  it("makOerder method should be defined", () => {
    expect(order.makeOrder).toBeDefined();
  });
  it("makeOrder method should be defined", () => {
    expect(order.getUserOrders).toBeDefined();
  });

  describe("order working", () => {
    const user = new UserStore();
    const products = new producStore();
    beforeAll(async () => {
      await user.createUser({
        first_name: "youssef",
        last_name: "aly",
        password: "joejoejoejoe",
      });
      await products.createProduct({
        name: "shirt",
        price: 500,
        category: "clothing",
      });
    });
    it("should create a new order", async () => {
      const result: Order = await order.makeOrder({
        user_id: 3,
        status: "active",
        totalPrice: 700,
      });
      expect(result.id).toEqual(2);
      expect(+result.user_id).toEqual(3);
      expect(result.status).toEqual("active");
    });
    it("should insert product list to an order", async () => {
      const result: OrderProducts = await order.addProduct(3, 1, 1);
      expect(result.id).toEqual(1);
      expect(result.quantity).toEqual(3);
      expect(result.product_id).toEqual(1);
      expect(result.order_id).toEqual(1);
    });
    it("should return a specific user orders", async () => {
      const result: Order[] = await order.getUserOrders("3");
      expect(result[0].id).toEqual(2);
      expect(+result[0].user_id).toEqual(3);
      expect(result[0].status).toEqual("active");
    });
  });
});
