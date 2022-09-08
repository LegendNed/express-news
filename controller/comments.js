const { removeComment } = require("../models/comments")
const { POSTIVE_INT_REGEX } = require("../util/server")


exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params

    if (!comment_id?.match(POSTIVE_INT_REGEX)) return next({
        status: 400,
        message: 'Invalid comment_id provided'
    })

    removeComment(comment_id)
        .then(() => {
            res.status(204).send()
        })
}