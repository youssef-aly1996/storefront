import { User, UserStore } from "../../src/models/user/user";

const user = new UserStore();

describe("User Model", () => {
  it("should have a getUsers  method", () => {
    expect(user.getAllUsers).toBeDefined();
  });

  it("should have a getUserById method", () => {
    expect(user.getUserById).toBeDefined();
  });

  it("should have a createUser method", () => {
    expect(user.createUser).toBeDefined();
  });
  it("should create a user with token to true using createUser method", async () => {
    const token: string = await user.createUser({
      first_name: "sayed",
      last_name: "rweny",
      password: "thisismeenow2022#",
    });
    expect(token).toBeDefined();
  });
  it("should return the correct user using getUserById method", async () => {
    const id: number = 4;
    const result: User = await user.getUserById(id);

    console.log(result);
    expect(result.id).toEqual(id);
    expect(result.first_name).toEqual("sayed");
    expect(result.last_name).toEqual("rweny");
    expect(result.password.length).toBeGreaterThanOrEqual(60);
  });
  it("should return all users", async () => {
    const id: number = 4;
    const result: User[] = await user.getAllUsers();
    expect(result[3].id).toEqual(id);
    expect(result[3].first_name).toEqual("sayed");
    expect(result[3].last_name).toEqual("rweny");
  });
});
