const request = require("supertest");
const app = require("../server");
const pool = require("../config/database"); // Conexão com MySQL

let server;

describe("Dictionary Endpoints", () => {
  test("Should retrieve a word definition", async () => {
    const response = await request(app).get("/dictionary/test");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("word", "test");
    expect(response.body).toHaveProperty("definition", "A test definition");
  });

  test("Should return 404 for a word not found", async () => {
    const response = await request(app).get("/dictionary/nonexistent");

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  // Feche o servidor e o pool de conexões após os testes
  await pool.end(); // Fecha o pool de conexões
});
