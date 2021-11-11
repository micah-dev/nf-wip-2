const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `weather.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.google.com/search?q=UNCC+weather'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'weather',
    aliases: ['w'],
    category: 'Testing',
    description: 'Shows UNCC weekly weather forecast.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ message, interaction, channel }) => {

        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$('#rso > div:nth-child(2)');
        await element.screenshot({ path: tempPath })
        page.close();
        
        
        const attachment = new Discord.MessageAttachment(tempPath, tempFile);
        
        const embed_reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`This Weeks Weather Forecast! 🌤`)
            //.attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            //.setImage(tempPath)
            .setDescription(`[View on Web](${lookupURL})`)
            .setThumbnail(url = logo)
            .setTimestamp()
        
        
        
        

        // Send the response
        interaction?.followUp({
            ephemeral: true,
            embeds: [embed_reply],
            files: [attachment]
        })
    }
}