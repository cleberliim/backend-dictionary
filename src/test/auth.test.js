const request = require("supertest");
const app = require("../server"); // Certifique-se de que o app está sendo exportado corretamente

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return error if email or password is incorrect", async () => {
    const response = await request(app).post("/auth/signin").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });
});
