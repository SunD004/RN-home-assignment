var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
})

const tableUsers = mongoose.model('users', userSchema)

module.exports = tableUsers;