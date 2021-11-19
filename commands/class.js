
// /class list
// /class add <class_name> <class_days_active> <class_start_time> <class_end_time>
// /class delete <class_id>
// /class clear


const Discord = require('discord.js')
const secrets = require('../secrets.json')

const schema = require('../schema')

// ---------- TODO LOGIC

// For the given user:
    // List all todos as individual embeds.
async function listClasses(member, interaction, cmd_name, cmd_data, db) {
    user_id = member.id
    user_name = member.nickname

    let counts = await db.countDocuments()

    // Get all todo items for user
    let classEmbeds = []
    let classList = await db.find({ user: user_id })

    let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`${user_name}'s Class Schedule: 🎒'`)
        .setDescription(`${counts} classes.`)
    classEmbeds.push(embed)

    classList.forEach(doc => {
        classEmbeds.push(new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(doc.name)
            .setDescription(`Active ${doc.daysOfWeek} from ${doc.startTime} to ${doc.endTime}`)
        )
    })
    interaction?.reply({
        ephemeral: false,
        embeds: classEmbeds
    })
    


}

// For the given user:
    // Create a new todo called <todo_name> at <todo_due_date> at <todo_due_time> with
    // randomly generated <todo_id>
async function newClass(member, interaction, cmd_name, cmd_data, db) {
    user_id = member.id
    user_name = member.nickname
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

    // Testing
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Class added succesfully! ☑️')
        .addField(`${class_name}`, `> Active ${class_days_active}, ${class_start_time} - ${class_end_time}`)

    interaction?.reply({
        ephemeral: false,
        embeds: [success_embed]
    })
}

// For the given user:
    // Delete a todo using <todo_id>
async function deleteClass(member, interaction, cmd_name, cmd_data, db) {
    user_id = member.id
    user_name = member.nickname
    class_id = cmd_data[0].options[0].value
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)
    // Subcommand Debug
    console.log("class_id: ", class_id)


    // Delete a Document
    let counts = await db.countDocuments()

    // Get all todo items for user
    let classEmbeds = []
    let classList = await db.find({ user: user_id })
    let buttons = []

    let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`${user_name}'s Class Schedule: 🎒'`)
        .setDescription(`${counts} classes.`)
    classEmbeds.push(embed)

    classList.forEach(doc => {
        classEmbeds.push(new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle(doc.name)
            .setDescription(`Active ${doc.daysOfWeek} from ${doc.startTime} to ${doc.endTime}`)
        )
        buttons.push(new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId(`${doc.name}`)
                .setEmoji('❌')
                .setLabel('Delete?')
                .setStyle('DANGER')
        )
        )
    })
    interaction?.reply({
        ephemeral: false,
        embeds: classEmbeds,
        components: buttons,
    })
}

// For the given user:
    // Delete all todos.
async function clearClasses(member, interaction, cmd_name, cmd_data, db) {
    user_id = member.id
    user_name = member.nickname
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)


    // Testing
    const success_embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('All classes deleted succesfully! ❎')

    interaction?.reply({
        ephemeral: false,
        embeds: [sucess_embed]
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
                        name: 'class_id',
                        description: 'The id of the class to be deleted.',
                        type: 4,
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
            
            
            
            // Send an initial reply within 3 seconds, and then edit that reply.
            // await interaction.deferReply({
            //     ephemeral: false
            // })
            // await new Promise(resolve => setTimeout(resolve, 5000))

            console.log(instance.isDBConnected())
            
            let db = instance.mongoConnection.models['Classes']


            
            if (interaction.commandName === 'class') {

                // Will exist for all subcommands
                cmd_name = interaction.options.getSubcommand()
                cmd_data = interaction.options.data

                if (interaction.options.getSubcommand() === '-list') {
                    listClasses(member, interaction, cmd_name, cmd_data, db)
                }
                if (interaction.options.getSubcommand() === '-new') {
                    newClass(member, interaction, cmd_name, cmd_data, db)
                }
                if (interaction.options.getSubcommand() === '-delete') {
                    deleteClass(member, interaction, cmd_name, cmd_data, db)
                }
                if (interaction.options.getSubcommand() === '-clear') {
                    clearClasses(member, interaction, cmd_name, cmd_data, db)
                }
            }


            
        
        
        
        
        }
    }