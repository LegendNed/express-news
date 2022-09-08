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
    });
});