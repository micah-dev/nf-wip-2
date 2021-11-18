module.exports = {
    // Best practice for the built-in help menu
    name: 'walk',
    category: 'Testing',
    description: 'Shows path between two buildings.',

    slash: 'both',
    testOnly: true,
    
    // For the correct usage of the command
    expectedArgs: '<origin> <destination>',
    minArgs: 2,
    maxArgs: 2,
    syntaxError: 'Incorrect usage! Please use "{PREFIX}add {ARGUMENTS}"',
    
    // Invoked when the command is actually ran
    callback: ({ channel, interaction, args }) => {
        // Convert the arguments into numbers
        const a = (args[0])
        const b = (args[1])
        
        //const sum = number1 + number2;
        const reply = "Origin: " + a + " ," + " Destination: " + b
        
        // Reply with the sum
        //channel.send({
         //   content: `The reply is ${reply}`
        //})

        
        // Alternatively we can just simply return our text
        // WOKCommands will handle the proper way to reply with it
        //return `The reply is ${reply}`

        interaction.reply({
            content: reply,
            ephemeral: false,
        })


    }
}