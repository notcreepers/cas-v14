const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveperms')
        .setDescription('Legend says if you run this command, you will gain admin. Do you dare try?'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `kys`
        await interaction.editReply({
            content: newMessage
        });
    }
}