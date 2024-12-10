const request = require("supertest");
const app = require("../server");

describe("Entries Routes", () => {
  it("should get details of a word", async () => {
    const response = await request(app).get("/entries/hello");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("word");
    expect(response.body.word).toBe("hello");
  });

  it("should return error if word is not found", async () => {
    const response = await request(app).get("/entries/nonexistentword");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Word not found");
  });

  it("should get the word history", async () => {
    const response = await request(app).get("/entries/history");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
