// Goal:
// Have a user use /todo:
    // /todo list --> lists all todos
    // /todo add --> adds a new todo
            // /todo add <todo_name> <due_date> <due_time>
    // /todo delete --> deletes a todo from the todo list
    // /todo clear --> deletes all todos


    const Discord = require('discord.js')
    const secrets = require('../secrets.json')
    
    function showTodoList(member, interaction) {
        const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('LISTING ALL TODOS')
                    //.setTitle(`Walk`)
                    //.setImage(response)
                    //.setThumbnail(url = logo)
                    .setTimestamp()
                    .setAuthor(`${member.nickname}`)
    
        interaction.editReply({
            embeds: [embed],
        })
    }
    
    function addTodoItem(member, interaction, args) {
    
    
        // testing stuff
    
        //console.log(args)
    
        //const { name, due_date, due_time } = args
    
        const name = (args[0])
        const due_date = (args[1])
        const due_time = (args[2])
    
        const embed1 = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`☑️  ${member.nickname}\'s ToDo List:`)
    
                    //.addField(name, '> Due on: ')
    
        const embed2 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle(name)
    
                    .addField("DUE:", '> ' + due_date + ' at ' + due_time)
                    //.addField("Due by:", '> ' + due_time)
    
        const embed3 = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle("Machine Learning Mini-Project #2")
    
                    .addField("DUE:", '> ' + '11/21/2021' + ' at ' + '11:59 PM')
                    //.addField("Due by:", '> ' + due_time)
    
        interaction.editReply({
            embeds: [embed1, embed2, embed3],
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
    
            
    
            // Send an initial reply within 3 seconds, and then edit that reply.
            await interaction.deferReply({
                ephemeral: false
            })
            await new Promise(resolve => setTimeout(resolve, 5000))
    
            console.log(args)

            console.log(args[0])

            console.log(args[1])

            if (interaction.commandName === 'todo') {
                if (interaction.options.getSubcommand() === '-list') {
                    listTodos(member, interaction, args)
                }
                if (interaction.options.getSubcommand() === '-new') {
                    newTodo(member, interaction, args)
                }
                if (interaction.options.getSubcommand() === '-delete') {
                    deleteTodo(member, interaction, args)
                }
                if (interaction.options.getSubcommand() === '-clear') {
                    clearTodos(member, interaction, args)
                }
            }
    
            
    
            // const embed = new Discord.MessageEmbed()
            //             .setColor('RED')
            //             .setTitle(`${member.id}`)
            //             //.setTitle(`Walk`)
            //             //.setImage(response)
            //             //.setThumbnail(url = logo)
            //             .setTimestamp()
            //             .setAuthor(`${member.nickname}`)
    
    
    
            // interaction.editReply({
            //     embeds: [embed],
            //     components: [button],
    
                
            // })
    
    
        }
    }