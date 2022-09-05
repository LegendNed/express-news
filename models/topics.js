const DB = require('../db')
const { returnAll } = require('../util/database')

exports.fetchTopics = () => {
    return DB
        .query(`SELECT * FROM topics`)
        .then(returnAll)
}