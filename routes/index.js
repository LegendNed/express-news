const { Router } = require('express')

const API = require('../endpoints.json')

const Articles = require('./articles')
const Topics = require('./topics')
const Users = require('./users')
const Comments = require('./comments')

module.exports =
    Router()
        .get('/', (req, res) => res.status(200).send(API))
        .use('/articles', Articles)
        .use('/topics', Topics)
        .use('/users', Users)
        .use('/comments', Comments)
