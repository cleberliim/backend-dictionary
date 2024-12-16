const request = require('supertest');
const app = require('../index'); // Ajuste para o caminho correto do seu app

describe('Word Routes', () => {
  let token;

  beforeAll(async () => {
    // Realize o login para obter o token de autenticação
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'cleberlima',
        password: '123',
      });

    // Verifique se o token foi retornado corretamente
    token = res.body.token;
    expect(token).toBeDefined(); // Garantir que o token foi recebido
  });

  it('Deve buscar palavras', async () => {
    const res = await request(app)
      .get('/api/entries/en?search=apple')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('words'); // Verifique se a propriedade 'words' existe na resposta
    expect(Array.isArray(res.body.words)).toBe(true); // Verifique se 'words' é um array
  });

  it('Deve adicionar palavra ao histórico', async () => {
    const res = await request(app)
      .post('/api/entries/history/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ word: 'apple' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Palavra adicionada ao histórico');
  });

  it('Deve adicionar palavra aos favoritos', async () => {
    const res = await request(app)
      .post('/api/entries/favorites/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ word: 'gelo' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Palavra adicionada aos favoritos');
  });

  it('Deve remover palavra dos favoritos', async () => {
    const res = await request(app)
      .delete('/api/entries/en/banana/unfavorite')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Palavra removida dos favoritos');
  });
});
