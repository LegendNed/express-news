const { fetchUsers, fetchUser } = require("../models/users")

exports.getUsers = (req, res) => {
    fetchUsers()
        .then((users) => {
            res.status(200).send({ users })
        })
}

exports.getUser = (req, res, next) => {
    const { username } = req.params

    fetchUser(username)
        .then((user) => {
            if (!user)
                return res.status(404).send({ message: `User ${username} does not exist` })

            res.status(200).send({ user })
        })
        .catch(next)
} 