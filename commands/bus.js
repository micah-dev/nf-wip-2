const Discord = require('discord.js');
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

module.exports = {
    name: 'bus',
    category: 'Sprint 3',
    description: 'Shows UNCC bus routes.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction, channel }) => {

        const embed_reply = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`bus`)

        // Send the response
        interaction?.reply({
            ephemeral: false,
            embeds: [embed_reply]
        })

        
    }
}