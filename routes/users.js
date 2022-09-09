const { Router } = require('express')
const { getUsers, getUser } = require('../controller/users')

module.exports =
    Router()
        .get('/', getUsers)
        .get('/:username', getUser)