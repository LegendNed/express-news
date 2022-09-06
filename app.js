const express = require('express')
const { DatabaseError } = require('pg')

const { topics, articles, users } = require('./controller')
const { isErrorObject } = require('./util/server')

const app = express()

app.use(express.json())

app.get('/api/topics', topics.getTopics)

app.get('/api/articles', articles.getArticles)
app.get('/api/articles/:article_id', articles.getArticleByID)
app.patch('/api/articles/:article_id', articles.updateArticle)

app.get('/api/users', users.getUsers)

app.use((err, req, res, next) => {
    if (!err) next()

    if (isErrorObject(err))
        return res.status(err.status).send({
            message: err.message
        })

    if (err instanceof DatabaseError)
        return res.status(400).send({
            message: err.message,
            code: err.code
        })

    res.status(500).send({
        message: "Internal Server Error",
        error: {
            message: err.message,
            status: err.status || err.code
        }
    })
})

module.exports = app