const { fetchArticleByID } = require("../models/articles")

const POSTIVE_INT_REGEX = /^\+?(0|[1-9]\d*)$/

exports.getArticleByID = (req, res, next) => {
    const { article_id } = req.params

    if (!article_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid article_id provided'
    })

    fetchArticleByID(article_id)
        .then(article => {
            if (!article) return res.status(204).send()

            res.status(200).send({ article })
        })
}