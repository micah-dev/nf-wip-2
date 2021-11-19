const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `news.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://google.com'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'events',
    category: 'Sprint 2',
    description: 'Shows UNCC events.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    expectedArgs: '[category]', // [arg] means optional, <arg> means requried
    maxArgs: 1,

    callback: async ({ interaction }) => {

        let args = ''

        if (args.length == 0) {
            console.log('do default')
        } else {
            console.log('use ' + args)
        }

        await interaction.deferReply({ ephemeral: false })
        await new Promise(resolve => setTimeout(resolve, 5000))

        // const browser = await puppeteer.launch()
        // const page = await browser.newPage()
        // await page.goto(lookupURL)
        // const element = await page.$('#tncms-block-786297')
        // await element.screenshot({ path: tempPath })
        // page.close();

        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`FOOD 🍕`)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
            )

        
        interaction.editReply({
            //ephemeral: true,
            embeds: [embed],
            files: [attachment],
            components: [button],
        })



    }
}