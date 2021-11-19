
const Discord = require('discord.js')
const secrets = require('../secrets.json')
const todo = require('../schema')
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
    const todolist_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`${member.nickname}\'s Todo List:`)

    const todo_embed_sample_1 = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle("Make money")
        .addField("DUE:", '> ' + "11/21/2021" + ' at ' + "11:30 PM")

    const todo_embed_sample_2 = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle("Make more money")
        .addField("DUE:", '> ' + "11/22/2021" + ' at ' + "10:30 PM")

    const todo_embed_sample_3 = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle("Make even moremoney")
        .addField("DUE:", '> ' + "11/23/2021" + ' at ' + "9:30 PM")

    interaction?.reply({
        ephemeral: false,
        embeds: [todolist_embed, todo_embed_sample_1, todo_embed_sample_2, todo_embed_sample_3]
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

    new todo({
        user: user_id,
        name: todo_name,
        date: todo_due_date,
        time: todo_due_time
    }).save()



    // Testing
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Todo added succesfully! ☑️')

    const todo_embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle(`${todo_name}`)
        .addField("DUE:", '> ' + todo_due_date + ' at ' + todo_due_time)

    interaction?.reply({
        ephemeral: false,
        embeds: [success_embed, todo_embed]
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
    const success_embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('All Todos deleted succesfully! ❎')

    interaction?.reply({
        ephemeral: false,
        embeds: [sucess_embed]
    })
}

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