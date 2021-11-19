const Discord = require('discord.js')
const secrets = require('../secrets.json')
const schema = require('../schema')

async function listClasses(member, interaction, cmd_name, cmd_data, collection) {
    if (await collection.countDocuments() == 0) {
        interaction?.reply("You have no classes added!")
        return
    }
    user_id = member.id
    user_name = member.name
    let classEmbeds = []
    let classList = await collection.find({ user: user_id })
    let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Your Class Schedule: 🗓'`)
    classEmbeds.push(embed)

    classList.forEach(doc => {
        classEmbeds.push(new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(doc.name)
            .setDescription(`${doc.daysOfWeek} from ${doc.startTime} to ${doc.endTime}`)
        )
    })
    interaction?.reply({
        ephemeral: false,
        embeds: classEmbeds
    })



}
async function newClass(member, interaction, cmd_name, cmd_data, collection) {
    user_id = member.id
    class_name = cmd_data[0].options[0].value
    class_days_active = cmd_data[0].options[1].value
    class_start_time = cmd_data[0].options[2].value
    class_end_time = cmd_data[0].options[3].value

    new schema.classes({
        user: user_id,
        name: class_name,
        daysOfWeek: class_days_active,
        startTime: class_start_time,
        endTime: class_end_time,
    }).save()

    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Class added successfully! ☑️')
        .addField(`${class_name}`, `> Active ${class_days_active}, ${class_start_time} - ${class_end_time}`)

    interaction?.reply({
        ephemeral: false,
        embeds: [success_embed]
    })
}

// For the given user:
// Delete a todo using <todo_id>
async function deleteClass(member, interaction, cmd_name, cmd_data, collection) {
    user_id = member.id
    user_name = member.nickname
    class_name = cmd_data[0].options[0].value

    await collection.deleteOne({ user: user_id, name: class_name })

    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Deleted ${class_name}`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}

// For the given user:
// Delete all todos.
async function clearClasses(member, interaction, cmd_name, cmd_data, collection) {
    user_id = member.id
    user_name = member.nickname
    await collection.deleteMany({ user: user_id })
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Cleared your class schedule!`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}


// ----------


module.exports = {
    category: 'Sprint 3',
    guildOnly: true,
    slash: true,
    testOnly: true,

    name: 'class',
    description: 'View your class schedule and get class reminders.',
    type: 2,

    // /class add <class_name> <class_days_active> <class_start_time> <class_end_time>
    options: [
        {
            name: '-list',
            description: 'Lists all of your classes.',
            //required: true,
            type: 1,
        },
        {
            name: '-new',
            description: 'Creates a new class.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'the name of the class',
                    required: true,
                    type: 3,
                },
                {
                    name: 'days_active',
                    description: 'the days the class is active, ex: M,W,F',
                    required: true,
                    type: 3,
                },
                {
                    name: 'start_time',
                    description: 'time the class starts',
                    required: true,
                    type: 3,
                },
                {
                    name: 'end_time',
                    description: 'time the class ends',
                    required: true,
                    type: 3,
                }
            ]
        },
        {
            name: '-delete',
            description: 'Deletes a class.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'class_name',
                    description: 'The name of the class to be deleted.',
                    type: 3,
                    required: true,
                }
            ]
        },
        {
            name: '-clear',
            description: 'Deletes ALL class items.',
            //required: true,
            type: 1,
        }
    ],


    callback: async ({ interaction, member, args, instance }) => {
        if (!(interaction.commandName === 'class')) return
        let todoCollection = instance.mongoConnection.models['Classes']
        // Will exist for all subcommands
        cmd_name = interaction.options.getSubcommand()
        cmd_data = interaction.options.data

        switch (interaction.options.getSubcommand()) {
            case '-list':
                listClasses(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-new':
                newClass(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-delete':
                deleteClass(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-clear':
                clearClasses(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
        }
    }
}