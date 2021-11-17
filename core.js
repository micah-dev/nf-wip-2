const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const { Intents } = DiscordJS
require("dotenv").config()
const secrets = require('./secrets.json')
const mongoose = require('mongoose')
const testSchema = require('./test-schema')



const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})



client.on('ready', async () => {
    


    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // What guilds your slash commands will be created in
        testServers: ['529033279421153301', '880879298536431676'],
        //botOwners: [''],
        mongoUri: secrets.mongo_uri,
        dbOptions: {
            keepAlive: true
        }
    })

    // need to remove this
    setTimeout(async () => {
        await new testSchema({
            message: 'hello world!!',
        }).save()
    }, 1000)

    
})



client.login(secrets.discord_token)