
const Discord = require('discord.js')
const secrets = require('../secrets.json')
const schema = require('../schema')


async function listTodos(member, interaction, cmd_name, cmd_data, collection) {
    user_id = member.id
    user_name = member.nickname
    let todoEmbeds = []
    let todoList = await collection.find({ user: user_id })

    todoList.forEach(doc => {
        todoEmbeds.push(new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle(doc.name)
            .setDescription(`${doc.date} @ ${doc.time}`)
        )
    })
    interaction?.reply({
        ephemeral: false,
        embeds: todoEmbeds
    })
}

// For the given user:
// Create a new todo called <todo_name> at <todo_due_date> at <todo_due_time> with
// randomly generated <todo_id>
async function newTodo(member, interaction, cmd_name, cmd_data, collection) {
    todo_name = cmd_data[0].options[0].value
    todo_due_date = cmd_data[0].options[1].value
    todo_due_time = cmd_data[0].options[2].value

    new schema.todo({
        user: member.id,
        name: todo_name,
        date: todo_due_date,
        time: todo_due_time
    }).save()

    // Testing
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Todo added succesfully! ☑️')
        .setDescription(`${todo_name} @ ${todo_due_date} by ${todo_due_time}`)
    interaction?.reply({
        ephemeral: false,
        embeds: [success_embed]
    })
}
async function deleteTodo(member, interaction, cmd_name, cmd_data, collection) {
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
async function clearTodos(member, interaction, cmd_name, cmd_data, collection) {
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

    callback: async ({ interaction, member, args, instance }) => {
        if (!(interaction.commandName === 'todo')) return
        let todoCollection = instance.mongoConnection.models['Todo']
        // Will exist for all subcommands
        cmd_name = interaction.options.getSubcommand()
        cmd_data = interaction.options.data

        switch (interaction.options.getSubcommand()) {
            case '-list':
                listTodos(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-new':
                newTodo(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-delete':
                deleteTodo(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
            case '-clear':
                clearTodos(member, interaction, cmd_name, cmd_data, todoCollection)
                break;
        }
    }
}