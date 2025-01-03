import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const gql = '/graphql';

describe('GraphqQL (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(gql, () => {
    describe('challenges', () => {
      it('should get list of challenges', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: '{challenges { total }}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.challenges.total).toBeDefined();
          });
      });
    });
  });
});
