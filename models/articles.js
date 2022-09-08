const DB = require('../db')
const format = require('pg-format')
const { returnFirst } = require('../util/database')

exports.fetchArticles = ({ topic, sort_by = "created_at", order = "desc" } = {}) => {
    if (order && !['asc', 'desc'].includes(order))
        return Promise.reject({ status: 400, message: `Cannot order by ${order}` })

    let params = [],
        query = `
        SELECT articles.*, 
            CAST(COUNT(comments.comment_id) as INT) as comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
    `

    if (topic) {
        params.push(topic)
        query += ` WHERE articles.topic = %${params.length}$L`
    }

    params.push(sort_by)
    query += ` 
        GROUP BY articles.article_id
        ORDER BY articles.%${params.length}$I ${order.toUpperCase()}
    `

    return DB
        .query(format(query, ...params))
        .then(({ rows, rowCount }) => {
            if (rowCount) return [rows]

            return Promise.all([null,
                DB.query(`SELECT * FROM topics WHERE slug = $1`, [topic])
            ])
        })
        .then(([rows, response]) => {
            if (rows?.length) return rows

            if (!response.rows.length) return Promise.reject({
                status: 404,
                message: `Topic ${topic} does not exist`
            })

            return []
        })
}

exports.fetchArticleByID = (id) => {
    return DB
        .query(`
        SELECT articles.*, 
               CAST(COUNT(comments.comment_id) as INT) as comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
        `, [id])
        .then(returnFirst)
}

exports.fetchArticleComments = (id) => {
    return DB
        .query(`
        SELECT comment_id, votes, created_at, author, body
        FROM comments
        WHERE article_id = $1
        `, [id])
        .then(({ rows, rowCount }) => {
            if (rowCount) return [rows]

            return Promise.all([null,
                DB.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
            ])
        })
        .then(([rows, response]) => {
            if (rows?.length) return rows

            if (!response.rows.length) return Promise.reject({
                status: 404,
                message: `Article (${id}) does not exist`
            })

            return []
        })
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

exports.addComment = (id, { username, body }) => {
    return DB
        .query(`
        INSERT INTO comments
        (article_id, body, author)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [id, body, username])
        .then(returnFirst)
        .catch(err => {
            const constraint = err.constraint.split('_')
            const fieldError = constraint[1]

            const value = fieldError == 'author' ? username : id
            return Promise.reject({
                status: 400,
                message: `"${value}" is not a valid ${fieldError}`
            })
        })
}