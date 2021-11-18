const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `weather.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.google.com/search?q=UNCC+weather'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'weather',
    category: 'Testing',
    description: 'Shows UNCC weekly weather forecast.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$('#rso > div:nth-child(2)');
        await element.screenshot({ path: tempPath })
        page.close();
        
        
        //const attachment = new Discord.MessageAttachment(tempPath, tempFile);
        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);

        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`This Weeks Weather Forecast! 🌤`)
            //.attachFiles(attachment)
            //.setImage('./commands/temp/weather.png')
            //.setImage(`${tempFile}`)
            .setImage(`attachment://${tempFile}`)
            //.setImage('https://imgur.com/TkalDv4')
            //.setDescription(`[View on Web](${lookupURL})`)
            //.setThumbnail(url = logo)
            .setTimestamp()

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
                
            )
        
        
        // APPARENTLY, in discord.js@13, bots MUST
        // respond to slash commands in 3 seconds,
        // thus, we must either defer a reply and
        // then edit it, or reply and then edit it.

        await interaction.deferReply({
            ephemeral: false
        })
        
        await new Promise(resolve => setTimeout(resolve, 5000))

        await interaction.editReply({
            //ephemeral: true,
            embeds: [embed],
            files: [attachment],
            components: [button],
        })

    

    }
}