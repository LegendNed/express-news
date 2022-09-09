const { Router } = require('express')
const { getTopics } = require('../controller/topics')

module.exports =
    Router()
        .get('/', getTopics)