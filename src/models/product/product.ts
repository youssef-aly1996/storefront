import { getClient } from "../../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class producStore {
  async createProduct(p: Product): Promise<Product> {
    const query = `insert into products (name, price, category) 
    values ($1, $2, $3) returning *`;
    try {
      const conn = await getClient().connect();
      const result = await conn.query(query, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error creating product, ${error}`);
    }
  }

  async getProductById(id: string): Promise<Product> {
    const query = `select * from products where id= $1`;
    try {
      const conn = await getClient().connect();
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`error finding product with id${id}, ${error}`);
    }
  }
  async getProducts(): Promise<Product[]> {
    const query = `select * from products`;
    try {
      const conn = await getClient().connect();
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`error finding all product, ${error}`);
    }
  }
}
