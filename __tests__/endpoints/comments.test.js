const request = require('supertest')
const app = require('../../app')

const seed = require('../../db/seeds/seed')
const testData = require('../../db/data/test-data')

const DB = require('../../db')

beforeEach(() => seed(testData))
afterAll(() => DB.end())

describe('DELETE', () => {
    describe('/api/comments/:article_id', () => {
        it('204: Comment removed from database', () => {
            return request(app)
                .delete('/api/comments/1')
                .expect(204)
        });

        it('400: Return error if comment_id provided is invalid', () => {
            const validateResponse = ({ body }) => {
                expect(body).toHaveProperty('message')
                expect(body.message).toBe("Invalid comment_id provided")
            }

            const testCases = [
                request(app)
                    .delete('/api/comments/cat')
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .delete('/api/comments/0.1')
                    .expect(400)
                    .then(validateResponse),

                request(app)
                    .delete('/api/comments/-20')
                    .expect(400)
                    .then(validateResponse)
            ]

            return Promise.all(testCases)
        });

        it
    });
});