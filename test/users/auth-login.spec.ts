import * as supertest from 'supertest';
import { expect } from 'chai';
import { getRandomUser } from '../utils/users.utils';
import { getNegativeUserData } from '../utils/auth-login.utils';

const request = supertest('http://localhost:4000/api');

describe('Success login tests', () => {
  const payload = getRandomUser();
  let user;
  before(async () => {
    const res = await request.post('/auth/signup').send(payload).expect(201);
    user = res.body;
  });

  it('should login user', async () => {
    const res = await request
      .post('/auth/login')
      .send({ email: user.email, password: '123456' })
      .expect(201);
    expect(res.body).to.have.property('accessToken').to.be.a('string');
    expect(res.body).to.have.property('firstName').be.eq(payload.firstName);
    expect(res.body).to.have.property('lastName').be.eq(payload.lastName);
    expect(res.body).to.have.property('email').be.eq(payload.email);
    expect(res.body).to.have.property('id').to.be.a('number');
  });

  it('should not login with invalid credentials', async () => {
    const payload = {
      email: 'testemail@mail.com',
      password: '12345678',
    };
    const errMessage = 'Username or password is not valid';
    const res = await request.post('/auth/login').send(payload).expect(404);
    expect(res.body.message).to.be.eq(errMessage);
  });

  after(async () => {
    await request.delete(`/users/${user.id}`).expect(200);
  });
});

describe('Negative login tests', () => {
  const payloads = getNegativeUserData();

  payloads.forEach(({ payload, expected }) => {
    it('should not login without email or password', async () => {
      const res = await request.post('/auth/login').send(payload).expect(400);
      expect(res.body.message)
        .to.be.an('array')
        .that.includes.members(expected);
    });
  });
});
