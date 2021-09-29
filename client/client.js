const { Client, Intents } = require('discord.js');
const registerCommands = require('../commands/commands');

const generatedClient = new Client({
    intents: [
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});


generatedClient.on('ready', async () => {
    console.log(`Logged in as ${generatedClient.user.tag}!`);
    await registerCommands(generatedClient);
});


// generatedClient.on('interactionCreate', async (interaction) => {
//     if (!interaction.isCommand()) return;

//     const { commandName, options } = interaction



//     if (commandName === 'ping') {
//         await interaction.deferReply();
//         await interaction.editReply('Pong!');
//     }
//     if (commandName === 'todo') {
//         await interaction.deferReply();
//         await interaction.editReply(`Tu lista es: cd`)
//     }

// });


generatedClient.login(process.env.TOKEN);

module.exports = generatedClient;