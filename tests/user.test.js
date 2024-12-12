const request = require('supertest');
const app = require('../index'); // Ajuste para o caminho correto do seu app

describe('User Routes', () => {
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

  it('Deve retornar informações do usuário', async () => {
    const res = await request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username');
  });

  it('Deve atualizar o usuário', async () => {
    const res = await request(app)
      .put('/api/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'updatedUser',
        password: 'newpassword123',
      });

    expect(res.status).toBe(200);
    expect(res.text).toBe('Usuário atualizado com sucesso');
  });
});
