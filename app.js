const express = require('express')

const { topics } = require('./controller')

const app = express()

app.get('/api/topics', topics.getTopics)

app.use((err, req, res, next) => {
    if (!err) next()

    res.status(500).send({
        message: "Internal Server Error",
        error: {
            message: err.message,
            status: err.status || err.code
        }
    })
})

module.exports = app