const request = require('supertest');
const app = require('../index'); // Ajuste para o caminho correto do seu app

describe('Word Routes', () => {
  let token;

  beforeAll(async () => {
    // Realize o login para obter o token de autenticação
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('Deve buscar palavras', async () => {
    const res = await request(app)
      .get('/api/entries/en?search=apple')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('words');
  });

  it('Deve adicionar palavra ao histórico', async () => {
    const res = await request(app)
      .post('/api/entries/history/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ word: 'apple' });

    expect(res.status).toBe(200);
  });

  it('Deve adicionar palavra aos favoritos', async () => {
    const res = await request(app)
      .post('/api/entries/favorites/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ word: 'banana' });

    expect(res.status).toBe(200);
  });

  it('Deve remover palavra dos favoritos', async () => {
    const res = await request(app)
      .delete('/api/entries/en/banana/unfavorite')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
