const DB = require('../db')
const { returnFirst } = require('../util/database')

exports.fetchArticleByID = (id) => {
    return DB
        .query(`
        SELECT * FROM articles
        WHERE article_id = $1
        `, [id])
        .then(returnFirst)
}