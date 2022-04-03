import * as supertest from 'supertest';
import { expect } from 'chai';
import { getRandomUser } from './utils/users.utils';

const request = supertest('http://localhost:4000/api');

describe('Success login tests', () => {
  const payload = getRandomUser();
  it('should create test user', async () => {
    await request.post('/auth/signup').send(payload).expect(201);
  });

  it('should login user', async () => {
    const res = await request
      .post('/auth/login')
      .send({ email: payload.email, password: payload.password })
      .expect(201);
    expect(res.body.accessToken).to.be.a('string');
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
});

describe('Negative login tests', () => {
  const payloads = [
    {
      payload: {
        email: '',
        password: '12345678',
      },
      expected: ['email must be an email'],
    },
    {
      payload: {
        email: 'testemail@mail.com',
        password: '',
      },
      expected: ['password should not be empty'],
    },
    {
      payload: {
        email: 'testemail@mail.com',
        password: null,
      },
      expected: ['password must be a string', 'password should not be empty'],
    },
    {
      payload: {
        email: null,
        password: '123456',
      },
      expected: ['email must be an email', 'email must be a string'],
    },
  ];

  payloads.forEach(({ payload, expected }) => {
    it('should not login without email or password', async () => {
      const res = await request.post('/auth/login').send(payload).expect(400);
      expect(res.body.message)
        .to.be.an('array')
        .that.includes.members(expected);
    });
  });
});
