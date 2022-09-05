const Express = require('express')

const { topics } = require('./controller')

const app = Express()

app.get('/api/topics', topics.getTopics)

app.use((err, req, res, next) => {
    if (!err) next()

    res.status(500).send({
        message: err.message,
        status: err.status || err.code
    })
})

module.exports = app