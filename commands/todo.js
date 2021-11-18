const Discord = require('discord.js')
const secrets = require('../secrets.json')


module.exports = {
    name: 'todo',
    category: 'Sprint 3',
    description: 'Shows path between two buildings.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    // Args
    expectedArgs: '<',

    syntaxError: 'Incorrect usage! Please use "/todo" to view your todo list or "/todo add <task_name> <due_date> <due_time>"',


    callback: async ({ interaction }) => {

        // Send an initial reply within 3 seconds, and then edit that reply.
        await interaction.deferReply({
            ephemeral: false
        })
        await new Promise(resolve => setTimeout(resolve, 5000))

        
    }
}