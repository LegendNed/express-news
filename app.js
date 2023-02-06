const express = require('express')
const cors = require('cors')
const { DatabaseError } = require('pg')
const { isErrorObject } = require('./util/server')

const Routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', Routes)

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