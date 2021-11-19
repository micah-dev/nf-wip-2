
// /class list
// /class add <class_name> <class_days_active> <class_start_time> <class_end_time>
// /class delete <class_id>
// /class clear


const Discord = require('discord.js')
const secrets = require('../secrets.json')

// ---------- TODO LOGIC

// For the given user:
    // List all todos as individual embeds.
function listClasses(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)


    // Testing
    const schedule_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${member.nickname}\'s Class Schedule:`)

    const class_embed_sample_1 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle("Machine Learning")
        .addField("Days Active", "> M")
        .addField("Start Time", "> 10:10 AM")
        .addField("End Time", "> 1:10 PM")

    const class_embed_sample_2 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle("Computer Vision")
        .addField("Days Active", "> M W")
        .addField("Start Time", "> 2:30 PM")
        .addField("End Time", "> 3:45 PM")

    const class_embed_sample_3 = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle("Mobile Robotics")
        .addField("Days Active", "> Th")
        .addField("Start Time", "> 8:30 AM")
        .addField("End Time", "> 11:30 AM")

    interaction?.reply({
        ephemeral: false,
        embeds: [schedule_embed, class_embed_sample_1, class_embed_sample_2, class_embed_sample_3]
    })
}

// For the given user:
    // Create a new todo called <todo_name> at <todo_due_date> at <todo_due_time> with
    // randomly generated <todo_id>
function newClass(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    class_name = cmd_data[0].options[0].value
    class_days_active = cmd_data[0].options[1].value
    class_start_time = cmd_data[0].options[2].value
    class_end_time = cmd_data[0].options[3].value
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)
    // Subcommand Debug
    console.log("class_name: ", class_name)
    console.log("class_days_active: ", class_days_active)
    console.log("class_start_time: ", class_start_time)
    console.log("class_end_time: ", class_end_time)


    // Testing
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Class added succesfully! ☑️')

    const class_embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle(`${class_name}`)
        //.addField("DUE:", '> ' + todo_due_date + ' at ' + todo_due_time)
        //.setTitle("Computer Vision")
        .addField("Days Active", '> ' + class_days_active)
        .addField("Start Time", '> ' + class_start_time)
        .addField("End Time", '> ' + class_end_time)

    interaction?.reply({
        ephemeral: false,
        embeds: [success_embed, class_embed]
    })
}

// For the given user:
    // Delete a todo using <todo_id>
function deleteClass(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    class_id = cmd_data[0].options[0].value
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)
    // Subcommand Debug
    console.log("class_id: ", class_id)


    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`class -delete`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}

// For the given user:
    // Delete all todos.
function clearClasses(member, interaction, cmd_name, cmd_data) {
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
        
        
        callback: async ({ interaction, member, args }) => {
            
            
            
            // Send an initial reply within 3 seconds, and then edit that reply.
            // await interaction.deferReply({
            //     ephemeral: false
            // })
            // await new Promise(resolve => setTimeout(resolve, 5000))


            
            if (interaction.commandName === 'class') {

                // Will exist for all subcommands
                cmd_name = interaction.options.getSubcommand()
                cmd_data = interaction.options.data

                if (interaction.options.getSubcommand() === '-list') {
                    listClasses(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-new') {
                    newClass(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-delete') {
                    deleteClass(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-clear') {
                    clearClasses(member, interaction, cmd_name, cmd_data)
                }
            }


            
        
        
        
        
        }
    }