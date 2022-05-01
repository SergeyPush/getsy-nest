import * as supertest from 'supertest';
import { getTestProduct } from '../utils/product.utils';
import { expect } from 'chai';
import { getRandomUser } from '../utils/users.utils';

const request = supertest('http://localhost:4000/api');

describe('Get products', () => {
  let product;
  let user;
  const payload = getTestProduct();
  before(async () => {
    const payloadUser = getRandomUser();
    const res = await request
      .post('/auth/signup')
      .send(payloadUser)
      .expect(201);
    user = res.body;

    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send(payload)
      .expect(201);
    product = response.body;
  });

  it('should return all products', async () => {
    const response = await request.get('/products').expect(200);
    expect(response.body).to.be.an('array').and.not.to.be.empty;
  });
  it('should return single product', async () => {
    const res = await request.get(`/products/${product.id}`).expect(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title').be.eq(payload.title);
    expect(res.body).to.have.property('description').be.eq(payload.description);
    expect(res.body).to.have.property('type').be.eq(payload.type);
    expect(res.body)
      .to.have.property('features')
      .to.include.members(payload.features);
    expect(res.body).to.have.property('price').be.eq(payload.price);
  });

  it('should return 404 if user not found', async () => {
    const nonExistingUser = 99999;
    const response = await request
      .get(`/products/${nonExistingUser}`)
      .expect(400);
    expect(response.body.message).to.be.equal('Product not found');
  });

  after(async () => {
    await request.delete(`/products/${product.id}`).expect(200);
    await request.delete(`/users/${user.id}`).expect(200);
  });
});
