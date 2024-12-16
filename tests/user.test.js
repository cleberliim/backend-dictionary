const request = require('supertest');
const app = require('../index'); // Ajuste para o caminho correto do seu app

describe('User Routes', () => {
  let token;

  beforeAll(async () => {
    // Realize o login para obter o token de autenticação
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'cleberlima',
        password: '123',
      });

    // Verificar se o token foi recebido
    token = res.body.token;
    expect(token).toBeDefined(); // Garante que o token foi gerado
  });

  it('Deve retornar informações do usuário', async () => {
    const res = await request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body.username).toBe('cleberlima'); // Verifique se o nome do usuário está correto
  });

  it('Deve atualizar o usuário', async () => {
    const res = await request(app)
      .put('/api/user/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'cleberlima',
        password: '12322',
      });

    expect(res.status).toBe(200);
    expect(res.text).toBe('Usuário atualizado com sucesso');
  });

  it('Deve retornar erro se o token for inválido', async () => {
    const res = await request(app)
      .get('/api/user/me')
      .set('Authorization', 'Bearer invalid_token');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Token inválido ou expirado');
  });
});
