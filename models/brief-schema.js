const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    userID: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true,
    },
    daysActive: {
        type: Array,
        required: true,
    },
    remindTime: {
        type: Date,
        required: true,
    }
})

const name = "brief_item"
module.exports = mongoose.models[name] || mongoose.model(name, schema)