const Discord = require('discord.js')
const secrets = require('../secrets.json')
const testSchema = require('../models/test-schema')

// allow the user to choose what command they want sent them to them at 8am

module.exports = {
    category: 'Sprint 4',
    guildOnly: true,
    slash: true,
    testOnly: true,

    name: 'brief',
    description: 'Get daily updates on NinerFlow content that you choose.',
    
    expectedArgs: '<name> <date> <time>',

    callback: async ({ interaction, member, instance, args }) => {

        // await interaction.deferReply({
        //     ephemeral: true
        // })
        // await new Promise(resolve => setTimeout(resolve, 5000))

        let item_name = args[0]
        let item_date = args[1]
        let item_time = args[1]

        item_date = new Date(item_date)
        //item_time = new Date(item_time)

        const new_item = await testSchema.create({
            userID: member.nickname,
            name: item_name,
            date: item_date,
            time: item_date,
        })

        console.log(new_item.name)
        console.log(new_item.date)
        console.log(new_item.time)

        // Send the item
        const reply = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Title')
            .setDescription('Description')

        interaction?.reply({
            ephemeral: true,
            embeds: [reply],
        })



    }
}