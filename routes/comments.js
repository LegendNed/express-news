const { Router } = require('express')
const { deleteComment } = require('../controller/comments')

module.exports =
    Router()
        .delete('/:comment_id', deleteComment)