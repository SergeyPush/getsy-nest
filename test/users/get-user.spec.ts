import * as supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:4000/api');

describe('Get all users', () => {
  it('GET /users', async () => {
    const users = await request.get('/users').expect(200);
    expect(users.body).to.not.be.empty;
  });
});

describe('Get single user', () => {
  it.skip('should return single user', async () => {
    const user = await request.get('/users/1').expect(200);
    expect(user.body).to.not.be.empty;
  });
});
