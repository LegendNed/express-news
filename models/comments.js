const DB = require('../db')
const { POSTIVE_INT_REGEX } = require("../util/server")

exports.removeComment = (id) => {
    if (!id?.match(POSTIVE_INT_REGEX)) return Promise.reject({
        status: 400,
        message: 'Invalid comment_id provided'
    })

    return DB
        .query(`
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *
        `, [id])
        .then(({ rowCount }) => {
            if (!rowCount) return Promise.reject({
                status: 404,
                message: "Comment not found"
            })
        })
}