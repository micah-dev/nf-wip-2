
const Discord = require('discord.js')
const secrets = require('../secrets.json')

// ---------- TODO LOGIC

// For the given user:
    // List all todos as individual embeds.
function listTodos(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)


    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`todo -list`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}

// For the given user:
    // Create a new todo called <todo_name> at <todo_due_date> at <todo_due_time> with
    // randomly generated <todo_id>
function newTodo(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    todo_name = cmd_data[0].options[0].value
    todo_due_date = cmd_data[0].options[1].value
    todo_due_time = cmd_data[0].options[2].value
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)
    // Subcommand Debug
    console.log("todo_name: ", todo_name)
    console.log("todo_due_date: ", todo_due_date)
    console.log("todo_due_time: ", todo_due_time)


    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`todo -new`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}

// For the given user:
    // Delete a todo using <todo_id>
function deleteTodo(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    todo_id = cmd_data[0].options[0].value
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)
    // Subcommand Debug
    console.log("todo_id: ", todo_id)


    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`todo -delete`)

    interaction?.reply({
        ephemeral: false,
        embeds: [embed]
    })
}

// For the given user:
    // Delete all todos.
function clearTodos(member, interaction, cmd_name, cmd_data) {
    user_id = member.id
    user_name = member.nickname
    // Debug
    console.log("cmd_name: ", cmd_name)
    console.log("user_id: ", user_id)
    console.log("user_name: ", user_name)

    
    // Testing
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`todo -clear`)

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
        
        name: 'todo',
        description: 'Create a todo list and get task reminders!',
        type: 2,

        options: [
            {
                name: '-list',
                description: 'Lists all of your todo items.',
                //required: true,
                type: 1,
            },
            {
                name: '-new',
                description: 'Creates a new todo item.',
                //required: true,
                type: 1,
                options: [
                    {
                        name: 'name',
                        description: 'the name',
                        required: true,
                        type: 3,
                    },
                    {
                        name: 'due_date',
                        description: 'date item is due',
                        required: true,
                        type: 3,
                    },
                    {
                        name: 'due_time',
                        description: 'time item is due',
                        required: true,
                        type: 3,
                    }
                ]
            },
            {
                name: '-delete',
                description: 'Deletes a todo item.',
                //required: true,
                type: 1,
                options: [
                    {
                        name: 'item_id',
                        description: 'The id of the todo item to be deleted.',
                        type: 4,
                        required: true,
                    }
                ]
            },
            {
                name: '-clear',
                description: 'Deletes ALL todo items.',
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


            
            if (interaction.commandName === 'todo') {

                // Will exist for all subcommands
                cmd_name = interaction.options.getSubcommand()
                cmd_data = interaction.options.data

                if (interaction.options.getSubcommand() === '-list') {
                    listTodos(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-new') {
                    newTodo(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-delete') {
                    deleteTodo(member, interaction, cmd_name, cmd_data)
                }
                if (interaction.options.getSubcommand() === '-clear') {
                    clearTodos(member, interaction, cmd_name, cmd_data)
                }
            }


            
        
        
        
        
        }
    }