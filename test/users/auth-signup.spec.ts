import * as supertest from 'supertest';
import { expect } from 'chai';
import { getInvalidUser, getRandomUser } from '../utils/users.utils';

const request = supertest('http://localhost:4000/api');

describe('Sign Up user successfully', () => {
  const payload = getRandomUser();
  it('should POST /auth/signup', async () => {
    const res = await request.post('/auth/signup').send(payload).expect(201);
    expect(res.body).to.have.property('firstName').be.eq(payload.firstName);
    expect(res.body).to.have.property('lastName').be.eq(payload.lastName);
    expect(res.body).to.have.property('email').be.eq(payload.email);
    expect(res.body).to.have.property('accessToken').that.is.a('string');
  });
});

describe('Throw an error', () => {
  const data = getInvalidUser();

  data.forEach(({ payload, expected }) => {
    it('should return error', async () => {
      const res = await request.post('/auth/signup').send(payload).expect(400);
      expect(res.body.message)
        .to.be.an('array')
        .that.includes.members(expected);
    });
  });
});
