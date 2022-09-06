const { fetchArticleByID, updateArticle } = require("../models/articles")

const POSTIVE_INT_REGEX = /^\+?(0|[1-9]\d*)$/

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