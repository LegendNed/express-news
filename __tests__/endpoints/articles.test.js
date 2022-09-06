const request = require('supertest')
const app = require('../../app')

const seed = require('../../db/seeds/seed')
const testData = require('../../db/data/test-data')

const DB = require('../../db')

beforeEach(() => seed(testData))
afterAll(() => DB.end())

describe('GET', () => {
    describe('/api/articles', () => {
        it('200: Retrieve all data sorted by date', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { articles } = body
                    expect(Array.isArray(articles)).toBe(true)

                    expect(articles).toBeSortedBy('created_at', {
                        descending: true
                    })

                    articles.forEach(article => {
                        expect(article).toEqual(
                            expect.objectContaining({
                                article_id: expect.any(Number),
                                author: expect.any(String),
                                title: expect.any(String),
                                body: expect.any(String),
                                topic: expect.any(String),
                                created_at: expect.toBeDateString(),
                                votes: expect.any(Number),
                                comment_count: expect.any(Number)
                            })
                        )
                    })
                })
        });

        it('200: Retrieve all articles from topic query', () => {
            return request(app)
                .get('/api/articles?topic=cats')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { articles } = body
                    expect(Array.isArray(articles)).toBe(true)
                    expect(articles).toHaveLength(1)

                    expect(articles).toBeSortedBy('created_at', {
                        descending: true
                    })

                    let article = articles[0]
                    expect(article).toEqual(
                        expect.objectContaining({
                            "article_id": 5,
                            "title": "UNCOVERED: catspiracy to bring down democracy",
                            "topic": "cats",
                            "author": "rogersop",
                            "body": "Bastet walks amongst us, and the cats are taking arms!",
                            "created_at": "2020-08-03T13:14:00.000Z",
                            "votes": 0,
                            "comment_count": 2
                        })
                    )
                })
        });

        it('200: Retrieve empty array of articles from topic query that has none', () => {
            return request(app)
                .get('/api/articles?topic=paper')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { articles } = body
                    expect(Array.isArray(articles)).toBe(true)
                    expect(articles).toHaveLength(0)
                })
        });

        it('200: Return an error if topic doesnt exist', () => {
            return request(app)
                .get('/api/articles?topic=evol')
                .expect(404)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    expect(body).toHaveProperty('message')
                    expect(body.message).toBe("Topic evol does not exist")
                })
        });
    });

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
                            article_id: 1,
                            author: expect.any(String),
                            title: expect.any(String),
                            body: expect.any(String),
                            topic: expect.any(String),
                            created_at: expect.toBeDateString(),
                            votes: expect.toBePositive(),
                            comment_count: expect.toBePositive()
                        })
                    )
                })
        });

        it('200: Retrieve single article with 0 comments', () => {
            return request(app)
                .get('/api/articles/2')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { article } = body
                    expect(Array.isArray(article)).toBe(false)

                    expect(article.comment_count).toBe(0)
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
                        created_at: expect.toBeDateString(),
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