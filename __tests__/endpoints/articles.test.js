const request = require('supertest')
const app = require('../../app')

const seed = require('../../db/seeds/seed')
const testData = require('../../db/data/test-data')

const DB = require('../../db')

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

        it('404: Returns nothing when no data is found', () => {
            return request(app)
                .get('/api/articles/999')
                .expect(404)
        });

        it('400: Return error if invalid article_id is provided', () => {
            const validateResponse = ({ body }) => {
                expect(Array.isArray(body)).toBe(false)

                expect(body).toHaveProperty('message')
                expect(body.message).toBe("Invalid article_id provided")
            }

            const testCases = [
                request(app)
                    .get('/api/articles/cat')
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .get('/api/articles/0.1')
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .get('/api/articles/-20')
                    .expect(400)
                    .then(validateResponse)
            ]

            return Promise.all(testCases)
        });
    });
});

describe('PATCH', () => {
    describe('/api/articles/:article_id', () => {
        it('200: Update article votes and return self', () => {
            const validateResponse = (expectedVotes, { body }) => {
                expect(Array.isArray(body)).toBe(false)

                const { article } = body
                expect(Array.isArray(article)).toBe(false)

                expect(article).toEqual(
                    expect.objectContaining({
                        article_id: 1,
                        author: expect.any(String),
                        title: expect.any(String),
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expectedVotes,
                    })
                )
            }

            const testCases = [
                request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: 100 })
                    .expect(200)
                    .then(validateResponse.bind(null, 200)),

                request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: -500 })
                    .expect(200)
                    .then(validateResponse.bind(null, -300)),
            ]

            return Promise.all(testCases)
        });

        it('400: Return error message if invalid body provided', () => {
            const validateResponse = ({ body }) => {
                expect(Array.isArray(body)).toBe(false)

                expect(body).toHaveProperty('message')
                expect(body.message).toBe('Invalid vote increment provided')
            }

            const testCases = [
                request(app)
                    .patch('/api/articles/1')
                    .send({ hello: 'world' })
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: [] })
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: {} })
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: Infinity })
                    .expect(400)
                    .then(validateResponse),
            ]

            return Promise.all(testCases)
        });

        it('400: Return error if invalid article_id is provided', () => {
            const validateResponse = ({ body }) => {
                expect(Array.isArray(body)).toBe(false)

                expect(body).toHaveProperty('message')
                expect(body.message).toBe("Invalid article_id provided")
            }

            const testCases = [
                request(app)
                    .patch('/api/articles/cat')
                    .send({ inc_votes: 100 })
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .patch('/api/articles/0.1')
                    .send({ inc_votes: 100 })
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .patch('/api/articles/-20')
                    .send({ inc_votes: 100 })
                    .expect(400)
                    .then(validateResponse)
            ]

            return Promise.all(testCases)
        });
    })

});