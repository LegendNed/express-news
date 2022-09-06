const DB = require('../db')
const { returnFirst } = require('../util/database')

exports.fetchArticleByID = (id) => {
    return DB
        .query(`
        SELECT  articles.*, 
                CAST(COUNT(comments.comment_id) as INT) as comment_count
        FROM articles
        INNER JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
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