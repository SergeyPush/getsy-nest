import * as supertest from 'supertest';
import { getTestProduct } from '../utils/product.utils';
import { expect } from 'chai';
import { getRandomUser } from '../utils/users.utils';

const request = supertest('http://localhost:4000/api');

describe('Create products', () => {
  let product;
  let user;

  before(async () => {
    const payload = getRandomUser();
    const res = await request.post('/auth/signup').send(payload).expect(201);
    user = res.body;
  });

  it('Should create new product', async () => {
    const payload = getTestProduct();
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(payload)
      .expect(201);
    product = res.body;

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title').be.eq(payload.title);
    expect(res.body).to.have.property('description').be.eq(payload.description);
    expect(res.body).to.have.property('type').be.eq(payload.type);
    expect(res.body)
      .to.have.property('features')
      .to.include.members(payload.features);
  });

  after(async () => {
    await request.delete(`/products/${product.id}`).expect(200);
    await request.delete(`/users/${user.id}`).expect(200);
  });
});
