import * as supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('http://localhost:4000/api');

describe('Get all users', () => {
  it('GET /users', async () => {
    const users = await request.get('/users').expect(200);
    expect(users.body).to.not.be.empty;
  });
});
