const express = require('express')

const { topics, articles, users } = require('./controller')
const { isErrorObject } = require('./util/server')

const app = express()

app.get('/api/topics', topics.getTopics)
app.get('/api/articles/:article_id', articles.getArticleByID)
app.get('/api/users', users.getUsers)

app.use((err, req, res, next) => {
    if (!err) next()

    if (isErrorObject(err))
        return res.status(err.status).send({
            message: err.message
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