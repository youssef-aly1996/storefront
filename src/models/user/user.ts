import { getClient } from "../../database";
import dotenv from "dotenv";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

dotenv.config();
const { BCRYP_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};
export class UserStore {
  async createUser(u: User): Promise<string> {
    try {
      const sql = `INSERT INTO users (first_name, last_name, password) 
        VALUES($1, $2, $3) returning id`;
      const conn = await getClient().connect();
      const hashedPassword = hashSync(
        u.password + BCRYP_PASSWORD,
        parseInt(SALT_ROUNDS)
      );

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hashedPassword,
      ]);
      const id = result.rows[0];
      conn.release();

      const jwtToken = sign(
        { firstName: u.first_name, userId: id },
        process.env.TOKEN_SECRET as string
      );
      return jwtToken;
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }
  async getAllUsers(): Promise<User[]> {
    try {
      const query = `SELECT * FROM users;`;
      const conn = await getClient().connect();
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get users ${error}`);
    }
  }
  async getUserById(id: number): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id = $1;`;
      const conn = await getClient().connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}
