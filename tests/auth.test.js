const request = require("supertest");
const app = require("../src/app"); // Certifique-se de que o app está exportado corretamente

describe("POST /api/auth/signup", () => {
  it("deve criar um novo usuário e retornar um token", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Test User");
  });

  it("deve retornar erro ao não enviar todos os campos", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Todos os campos são obrigatórios.");
  });
});

describe("POST /api/auth/signin", () => {
  it("deve autenticar um usuário e retornar um token", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "testuser@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Test User");
  });

  it("deve retornar erro se o email ou senha estiverem incorretos", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email ou senha incorretos");
  });
});

it("deve autenticar um usuário e retornar um token", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "testuser@example.com",
      password: "testpassword",  // Certifique-se de que esta senha corresponde à senha criptografada no banco de dados
    });
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Test User");
  });
  