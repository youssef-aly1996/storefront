import { table } from "console";
import { getClient } from "../../database";

export type Order = {
  id?: number;
  user_id: number;
  totalPrice?: number;
  status: string;
};

export type OrderProducts = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class orderStore {
  async getUserOrders(id: string): Promise<Order[]> {
    try {
      const query = `select * from orders  where user_id= $1`;
      const conn = await getClient().connect();
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't get orders for user ${id} ${error}`);
    }
  }

  async makeOrder(o: Order): Promise<Order> {
    try {
      const query = `insert into orders (user_id, status, total_price) 
      values ($1, $2, $3) returning *`;
      const conn = await getClient().connect();
      const result = await conn.query(query, [
        o.user_id,
        o.status,
        o.totalPrice,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't insert a new order ${error}`);
    }
  }
  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<OrderProducts> {
    try {
      const query = `insert into order_products (quantity, order_id, product_id) 
      values ($1, $2, $3) returning *`;
      const conn = await getClient().connect();
      const result = await conn.query(query, [quantity, order_id, product_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't insert a new product to order ${error}`);
    }
  }
  async getSubTotal(oid: number): Promise<number> {
    try {
      const query1 = `select SUM(p.price) as subTotal
                      from order_products op
                      join products p on p.id = op.product_id
                      where order_id=$1`;
      const conn = await getClient().connect();
      const result = await conn.query(query1, [oid]);
      conn.release();
      const total: number = result.rows[0].subtotal;
      console.log(total);
      return total;
    } catch (error) {
      throw new Error(`couldn't get sub total ${error}`);
    }
  }
  async updateOrderPrice(oid: number) {
    try {
      const total = await this.getSubTotal(oid);
      const query = `update orders set total_price=$1 where id=$2`;
      const conn = await getClient().connect();
      await conn.query(query, [total, oid]);
    } catch (error) {
      throw new Error(`couldn't update order price ${error}`);
    }
  }
}
