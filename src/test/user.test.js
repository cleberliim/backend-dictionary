const request = require("supertest");
const app = require("../server");

describe("User Routes", () => {
  let token;

  beforeAll(async () => {
    // Registrar o usuário e pegar o token de autenticação
    const response = await request(app).post("/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
    });
    token = response.body.token;
  });

  it("should get the user profile", async () => {
    const response = await request(app)
      .get("/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toBe("testuser@example.com");
  });

  it("should add a word to favorites", async () => {
    const response = await request(app)
      .post("/user/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({
        wordId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Word added to favorites");
  });

  it("should get the user's favorites", async () => {
    const response = await request(app)
      .get("/user/favorites")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
