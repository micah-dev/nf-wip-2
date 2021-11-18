const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const https = require('https');

const tempFile = `park.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://parkingavailability.uncc.edu/decks'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'park',
    category: 'Testing',
    description: 'Shows UNCC parking lot capacity.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: false })
        https.get(lookupURL, res => {
            let data = ''
            res.on('data', chunk => {
                data += chunk;
            })
            res.on('end', () => {
                const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`Parking Availability`)
                    .setDescription(`[View on Web](https://dineoncampus.com/unccharlotte/hours-of-operation)`)
                    .setTimestamp()
                data = JSON.parse(data);
                for (loc of data) {
                    embed.addField(loc.name, Math.round(loc.percentAvailable * 100) +"%")
                }
                interaction.editReply({ embeds: [embed] })
            })
        })
    }
}