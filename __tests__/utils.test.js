const database = require('../util/database')
const server = require('../util/server')

describe('database', () => {
    describe('returnAll', () => {
        it('should return all items inside of rows property', () => {
            const input = {
                rows: [1, 2, 3]
            }

            expect(database.returnAll(input)).toEqual([1, 2, 3])
        });

        it('should return empty array or undefined', () => {
            const empty = {
                rows: []
            }

            expect(database.returnAll(empty)).toEqual([])

            const Undefined = {}

            expect(database.returnAll(Undefined)).toBe(undefined)
        });
    });
});

describe('server', () => {
    describe('isErrorObject', () => {
        it('should return boolean', () => {
            let input = {}

            expect(server.isErrorObject(input)).toEqual(expect.any(Boolean))
        });

        it('should return true if every key is valid', () => {
            let input = {
                message: "Hello world",
                status: 600
            }

            expect(server.isErrorObject(input)).toBe(true)
        });

        it('should return false if a key is missing', () => {
            let input = {
                message: "Bye Bye World"
            }

            expect(server.isErrorObject(input)).toBe(false)
        });
    });
});