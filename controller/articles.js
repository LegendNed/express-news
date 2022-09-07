const { fetchArticleByID, updateArticle, fetchArticles, fetchArticleComments, addComment } = require("../models/articles")

const POSTIVE_INT_REGEX = /^\+?(0|[1-9]\d*)$/

exports.getArticles = (req, res, next) => {
    let query = req.query

    fetchArticles(query)
        .then((articles) => {
            res.status(200).send({ articles })
        })
        .catch(next)
}

exports.getArticleByID = (req, res, next) => {
    const { article_id } = req.params

    if (!article_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid article_id provided'
    })

    fetchArticleByID(article_id)
        .then(article => {
            if (!article) return res.status(404).send()

            res.status(200).send({ article })
        })
}

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params

    if (!article_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid article_id provided'
    })

    fetchArticleComments(article_id)
        .then(comments => {
            res.status(200).send({ comments })
        })
        .catch(next)
}

exports.updateArticle = (req, res, next) => {
    const { article_id } = req.params

    if (!article_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid article_id provided'
    })

    const { body } = req
    if (!body) return next({
        status: 403,
        message: "No JSON body is provided"
    })

    const { inc_votes } = body
    if (typeof inc_votes !== 'number' || !isFinite(inc_votes)) return next({
        status: 400,
        message: 'Invalid vote increment provided'
    })

    updateArticle(article_id, body.inc_votes)
        .then((article) => {
            res.status(200).send({ article })
        })
        .catch(next)
}

exports.insertComment = (req, res, next) => {
    const { article_id } = req.params

    if (!article_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid article_id provided'
    })

    const { body: reqBody } = req
    if (!reqBody) return next({
        status: 403,
        message: "No JSON body is provided"
    })

    const { username, body } = reqBody
    if (typeof username !== 'string' || typeof body !== 'string') return next({
        status: 400,
        message: 'Properties should be strings'
    })

    addComment(article_id, { username, body })
        .then((comment) => {
            res.status(201).send({ comment })
        })
        .catch(next)
}