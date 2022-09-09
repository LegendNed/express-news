const { Router } = require('express')
const { getArticles,
    getArticleByID,
    updateArticle,
    insertComment,
    getArticleComments
} = require('../controller/articles')

module.exports = Router()
    .get('/', getArticles)
    .get('/:article_id', getArticleByID)
    .get('/:article_id/comments', getArticleComments)
    .post('/:article_id/comments', insertComment)
    .patch('/:article_id', updateArticle)