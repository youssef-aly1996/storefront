import supertest from "supertest";
import app from "../../src/api/server";

const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9tIG5hc3J0IiwibGFzdE5hbWUiOiJkM2QzIn0sImlhdCI6MTY0Njc3NzAxMX0.5JAb5JvjnfTZwgDECHzYOWcNyTIVVWwB1w-49-_fRUU";

describe("testing order endpoints", () => {
  beforeAll(async () => {
    await request
      .post("/users/signup")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ first_name: "om nasrt", last_name: "d3d3", password: "12345" });
    await request
      .post("/products/create")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({ name: "hummer", price: 580, category: "home" });
  });

  it("should create a new order and response with 201 code status", async () => {
    const response = await request
      .post("/orders/create")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ product_id: 1, quantity: 5, user_id: 1, status: "active" });
    expect(response.status).toBe(201);
  });
  it("should retrieve an order for a user and response with 200 code", async () => {
    const response = await request
      .get("/orders/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(200);
  });
});
