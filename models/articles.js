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

exports.updateArticle = (id, number) => {
    return DB
        .query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *
        `, [number, id])
        .then(returnFirst)
}