const DB = require('../db')
const { RETURN_ALL } = require('../util/database')

exports.fetchTopics = () => {
    return DB
        .query(`SELECT * FROM topics`)
        .then(RETURN_ALL)
}