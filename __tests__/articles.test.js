const request = require('supertest')
const app = require('../app')

const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

const DB = require('../db')

beforeEach(() => seed(testData))
afterAll(() => DB.end())

describe('GET', () => {
    describe('/api/articles/:article_id', () => {
        it('200: Retrieve single artile if valid ID provided', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { article } = body
                    expect(Array.isArray(article)).toBe(false)

                    expect(article).toEqual(
                        expect.objectContaining({
                            article_id: expect.any(Number),
                            author: expect.any(String),
                            title: expect.any(String),
                            body: expect.any(String),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                        })
                    )
                })
        });

        it('204: Returns nothing when no data is found', () => {
            return request(app)
                .get('/api/articles/999')
                .expect(204)
        });

        it('400: Return error if invalid article_id is provided', () => {
            return request(app)
                .get('/api/articles/cat')
                .expect(400)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    expect(body).toHaveProperty('message')
                    expect(body.message).toBe("Invalid article_id provided")
                })
        });
    });
});