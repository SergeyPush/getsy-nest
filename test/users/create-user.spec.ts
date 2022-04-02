import * as supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:4000/api');

describe('Create user', () => {
  it('should POST /users', async () => {
    const payload = {
      firstName: 'Ginger',
      lastName: 'Folks',
      email: 'gingerfolks@mail.com',
      password: '123456',
    };
    const res = await request.post('/auth/signup').send(payload).expect(201);
    expect(res.body).to.have.property('firstName').be.eq(payload.firstName);
    expect(res.body).to.have.property('lastName').be.eq(payload.lastName);
    expect(res.body).to.have.property('email').be.eq(payload.email);
    expect(res.body).to.have.property('accessToken').that.is.a('string');
  });
});

describe('Throw an error', () => {
  const data = [
    {
      payload: {
        firstName: '',
        lastName: 'Folks',
        email: 'gingerfolks@mail.com',
        password: '123456',
      },
      expected: ['firstName must be a string'],
    },
    {
      payload: {
        firstName: 'Ginger',
        lastName: '',
        email: 'gingerfolks@mail.com',
        password: '123456',
      },
      expected: ['lastName must be a string'],
    },
    {
      payload: {
        firstName: 'Ginger',
        lastName: 'Folks',
        email: '',
        password: '123456',
      },
      expected: ['email must be an email'],
    },
    {
      payload: {
        firstName: 'Ginger',
        lastName: 'Folks',
        email: 'gingerfolks@mail.com',
        password: '',
      },
      expected: ['password should not be empty'],
    },
  ];

  data.forEach(({ payload, expected }) => {
    it('should return error', async () => {
      const res = await request.post('/auth/signup').send(payload).expect(400);
      expect(res.body.message)
        .to.be.an('array')
        .that.includes.members(expected);
    });
  });
});
