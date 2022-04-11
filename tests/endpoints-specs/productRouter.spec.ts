import supertest from "supertest";
import app from "../../src/api/server";

const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Im9tIG5hc3J0IiwibGFzdE5hbWUiOiJkM2QzIn0sImlhdCI6MTY0Njc3NzAxMX0.5JAb5JvjnfTZwgDECHzYOWcNyTIVVWwB1w-49-_fRUU";

describe("testing product endpoints", () => {
  it("should create a new product and response with 201 code status", async () => {
    const response = await request
      .post("/products/create")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({ name: "hummer", price: 580, category: "home" });
    expect(response.status).toBe(201);
  });
  it("should retrieve a product with id and response with 200 code", async () => {
    const response = await request
      .get("/products/get/1")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("should retrieve all products with id and response with 200 code", async () => {
    const response = await request
      .get("/products/list")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
});
