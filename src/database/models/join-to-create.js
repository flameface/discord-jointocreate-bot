const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    UserLimit: {
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model("join-to-create", Schema);