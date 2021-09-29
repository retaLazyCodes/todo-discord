const { MessageEmbed } = require('discord.js');
const { generatedClient } = require('../index')
const {
    getList,
    addElement,
    removeElement,
    initUser
} = require('../utils/getUserDataInDb')


const showEmbed = async (interaction, response) => {
    const message = response[0]
    const listIsEmpty = response[1]

    if (listIsEmpty) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(message)
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
        if (!interaction.user.bot) {
            interaction.editReply({ embeds: [exampleEmbed] });
        }
        return
    }

    // create fields of embed
    const value = '_ _';
    const list = response[2]

    let fields = []

    list.forEach((element, index) => {
        fields.push({
            name: `> **${index}**. ${element}`,
            value
        })
    });

    // create embed
    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(message)
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            fields
        )
        .setTimestamp()

    if (!interaction.user.bot) {
        interaction.editReply({ embeds: [exampleEmbed] });
    }
}

generatedClient.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options, user } = interaction
    console.log(`se llamó <<${commandName}>>`)

    if (commandName === 'init') {
        await interaction.deferReply();
        const response = await initUser(user)

        // await interaction.editReply(response)
        await showEmbed(interaction, response)
    }

    if (commandName === 'todo') {
        await interaction.deferReply();
        const response = await getList(user)

        // await interaction.editReply(response[0])
        await showEmbed(interaction, response)
    }

    else if (commandName === 'add') {
        const newElement = options.getString('element')
        await interaction.deferReply();

        const response = await addElement(user, newElement)
        // await interaction.editReply(response)
        await showEmbed(interaction, response)
    }

    else if (commandName === 'rm') {
        const elementToDelete = options.getString('element')
        await interaction.deferReply();

        const response = await removeElement(user, elementToDelete)
        // await interaction.editReply(response)
        await showEmbed(interaction, response)
    }

});


module.exports = generatedClient;
