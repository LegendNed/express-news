const request = require('supertest')
const app = require('../../app')

const seed = require('../../db/seeds/seed')
const testData = require('../../db/data/test-data')

const DB = require('../../db')

beforeEach(() => seed(testData))
afterAll(() => DB.end())

describe('GET', () => {
    describe('/api/users', () => {
        it('200: Retrieve all users', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .then(({ body }) => {
                    const { users } = body
                    expect(Array.isArray(users)).toBe(true)
                    expect(users.length).toBeGreaterThan(0)

                    users.forEach(user => {
                        expect(user).toEqual(
                            expect.objectContaining({
                                username: expect.any(String),
                                name: expect.any(String),
                                avatar_url: expect.any(String),
                            })
                        )
                    })
                })
        });
    });

    describe('/api/user/:username', () => {
        it('200: Retrieve all single', () => {
            return request(app)
                .get('/api/users/lurker')
                .expect(200)
                .then(({ body }) => {
                    const { user } = body

                    expect(user).toEqual(
                        expect.objectContaining({
                            username: 'lurker',
                            name: expect.any(String),
                            avatar_url: expect.any(String),
                        })
                    )
                })
        });

        it('404: Return error if user does not exist', () => {
            return request(app)
                .get('/api/users/Ned')
                .expect(404)
                .then(({ body }) => {
                    const { message } = body
                    expect(message).toBe(`User Ned does not exist`)
                })
        })
    });
});