const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `food.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://dineoncampus.com/unccharlotte/hours-of-operation'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'food',
    category: 'Testing',
    description: 'Shows UNCC on-campus dining options.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        
        // Send an initial reply within 3 seconds, and then edit that reply.
        await interaction.deferReply({
            ephemeral: false
        })
        await new Promise(resolve => setTimeout(resolve, 10000))

        // Get the screenshot
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        page.setViewport({ width: 1920, height: 1080 });
        await page.goto(lookupURL)
        await page.waitForSelector('#main-content > div > div', { visible: true });
        const element = await page.$('#main-content > div > div')
        await element.screenshot({ path: tempPath })
        page.close();
        
        // Construct the reply
        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Here are the hours for on campus dining this week! 🍕`)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()
        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
                
            )

        // Actually send the reply
        await interaction.editReply({
            embeds: [embed],
            files: [attachment],
            components: [button],
        })
    }
}