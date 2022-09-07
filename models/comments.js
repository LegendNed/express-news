const DB = require('../db')

exports.removeComment = (id) => {
    return DB
        .query(`
        DELETE FROM comments
        WHERE comment_id = $1
        `, [id])
}