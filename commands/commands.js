//const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const myCommands = require('./allCommands')

// const commands = [
//     new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
//     new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
//     new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ]
//     .map(command => command.toJSON());


const registerCommands = async (client) => {
    const CLIENT_ID = client.application.id
    const GUILD_ID = client.guilds.cache.first().id

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: myCommands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error)
};


module.exports = registerCommands