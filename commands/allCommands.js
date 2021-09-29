const DiscordJS = require('discord.js')

const myCommands = [
    {
        name: 'init',
        description: 'Register the user in the DB',
    },
    {
        name: 'todo',
        description: 'Show the to-do list of the user',
    },
    {
        name: 'add',
        description: 'Add a new element to the list',
        options: [
            {
                name: 'element',
                description: 'The element to add to the list',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            }
        ]
    },
    {
        name: 'rm',
        description: 'Remove a element to the list',
        options: [
            {
                name: 'element',
                description: 'The element to remove to the list',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    }
];


module.exports = myCommands;
