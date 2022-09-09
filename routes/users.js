const { Router } = require('express')
const { getUsers } = require('../controller/users')

module.exports =
    Router()
        .get('/', getUsers)