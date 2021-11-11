const { MessageEmbed } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Sends an embed.',

    slash: 'both',
    testOnly: true,

    callback: async ({ message, text}) => {
        
        const embed = new MessageEmbed()
            .setDescription("Hello world.")
            .setTitle('Title')
            .setColor('RED')
            .setAuthor('Micah')
            .setFooter('Footer')
            .addFields([
                {
                    name: 'name1',
                    value: "value1",
                    inline: true,
                },
                {
                    name: 'name2',
                    value: "value2",
                    inline: true,
                },
                {
                    name: 'name3',
                    value: "value3",
                    inline: true,
                },
            ])
            .addField('name4', 'value4')
            .addField('name5', 'value5')

        return embed

    }
}