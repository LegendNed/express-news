const request = require('supertest')
const app = require('../../app')

const seed = require('../../db/seeds/seed')
const testData = require('../../db/data/test-data')

const DB = require('../../db')

beforeEach(() => seed(testData))
afterAll(() => DB.end())

describe('GET', () => {
    describe('/api/topics', () => {
        it('200: Retrieve all topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(false)

                    const { topics } = body
                    expect(Array.isArray(topics)).toBe(true)
                    expect(topics.length).toBeGreaterThan(0)

                    topics.forEach(topic => {
                        expect(topic).toEqual(
                            expect.objectContaining({
                                slug: expect.any(String),
                                description: expect.any(String)
                            })
                        )
                    })
                })
        });
    });
});