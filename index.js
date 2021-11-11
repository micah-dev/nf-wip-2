const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const { Intents } = DiscordJS
require("dotenv").config()

const secrets = require('./secrets.json');


const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})


client.on('ready', () => {
    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // What guilds your slash commands will be created in
        testServers: ['529033279421153301', '880879298536431676']
    })
})



client.login(secrets.discord_token)