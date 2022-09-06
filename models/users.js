const DB = require('../db')
const { returnAll } = require('../util/database')

exports.fetchUsers = () => {
    return DB
        .query(`SELECT * FROM users`)
        .then(returnAll)
}