const { MessagePayload } = require('discord.js')
const mongoose = require('mongoose')


const todo = new mongoose.Schema({
    user: {
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

const classes = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    daysOfWeek: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
})

module.exports = {
    todo: mongoose.model('Todo', todo, 'Todo'),
    classes: mongoose.model('Classes', classes, 'Classes'),
}