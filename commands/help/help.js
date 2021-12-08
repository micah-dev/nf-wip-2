// TODO: Migrate this to BUTTONS (maybe)

const Discord = require('discord.js')
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

module.exports = {
    name: 'help',
    category: 'Sprint 2',
    description: 'Shows the NinerFlow help menu.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    // TODO: seperate help menu by cmd category

    callback: async ({ interaction, instance }) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`Need some help? 👋🏽`)
            .setDescription(`'Below is all available commands. For more information, visit [NinerFlow docs](https://github.com/micah-dev/ninerflow).'`)
            .setTimestamp()
        instance.commandHandler.commands.forEach((command) => {
            if(command.category == 'Testing' || command.category == 'Configuration') return
            embed.addField(`${command.names[0]} ${command.syntax}`, command.description)
        })

        // Send the response
        interaction?.reply({
            ephemeral: true,
            embeds: [embed]
        })


    }
}