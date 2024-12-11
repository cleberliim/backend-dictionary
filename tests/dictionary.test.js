const request = require("supertest");
const app = require("../src/app"); // Certifique-se de que o app está exportado corretamente

describe("GET /api/dictionary/entries", () => {
  it("deve retornar uma lista de palavras", async () => {
    const response = await request(app).get("/api/dictionary/entries");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
