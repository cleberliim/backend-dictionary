const request = require("supertest");
const app = require("../app"); // Certifique-se de que o app está sendo importado corretamente

describe("Auth Endpoints", () => {
  it("Should login successfully", async () => {
    const response = await request(app)
      .post("/auth/signin") // Verifique se o prefixo "/auth" é necessário aqui
      .send({ username: "testuser", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should fail with incorrect credentials", async () => {
    const response = await request(app)
      .post("/auth/signin") // Mesmo prefixo "/auth"
      .send({ username: "testuser", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });
});
