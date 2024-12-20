const request = require('supertest');
const app = require('../index'); // Ajuste para o caminho correto do seu app 


describe('Auth Routes', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'cleberlima',
        password: '123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Deve fazer login com sucesso', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'cleberlima',
        password: '123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Deve retornar erro se credenciais estiverem incorretas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'cleberlima',
        password: '12322',
      });

    expect(res.status).toBe(401);
  });
});
