const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('Todo', schema, 'Todo')