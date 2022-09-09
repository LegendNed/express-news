const DB = require('../db')
const { returnAll, returnFirst } = require('../util/database')

exports.fetchUsers = () => {
    return DB
        .query(`SELECT * FROM users`)
        .then(returnAll)
}

exports.fetchUser = (username) => {
    return DB
        .query(`
        SELECT * FROM users
        WHERE username = $1
        `, [username])
        .then(returnFirst)
}