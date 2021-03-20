import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect("Hello World, I'm alive!");
  });

  it('Register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/account/register')
      .send({ username: 'Lorem', password: 'IpsumDolor' })
      .expect(201);
    const status = response.body.status;
    expect(status).toMatch('Success');
  });

  it('Authentificates a user and get a JWT Token from the response', async () => {
    const response = await request(app.getHttpServer())
      .post('/account/login')
      .send({ username: 'Lorem', password: 'IpsumDolor' })
      .expect(201);
    const jwtToken = response.body.access_token;
    expect(jwtToken).toMatch(
      /^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$/,
    ); // jwt regex
  });

  it('fails to authenticate user with an incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/account/login')
      .send({ username: 'Lorem', password: 'wrong12234' })
      .expect(401);

    expect(response.body.accessToken).not.toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
