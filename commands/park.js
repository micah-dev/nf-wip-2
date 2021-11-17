const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `park.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://pats.charlotte.edu'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'park',
    category: 'Testing',
    description: 'Shows UNCC parking lot capacity.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        //await page.goto(lookupURL, {
        //    waitUntil: 'networkidle2',
        //    timeout: 30000,
        //})
        await page.goto(lookupURL)
        const element = await page.$('#block-block-55 > div > div');
        await element.screenshot({ path: tempPath })
        page.close();
        
        
        //const attachment = new Discord.MessageAttachment(tempPath, tempFile);
        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(`Parking Availability! 🚗`)
            .setImage(`attachment://${tempFile}`)
            //.setThumbnail(url = logo)
            .setTimestamp()

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
                
            )


        // Send a reply within 3 seconds, and then edit that reply.
        await interaction.deferReply({
            ephemeral: false
        })
        
        await new Promise(resolve => setTimeout(resolve, 10000))

        await interaction.editReply({
            //ephemeral: true,
            embeds: [embed],
            files: [attachment],
            components: [button],
        })

    

    }
}