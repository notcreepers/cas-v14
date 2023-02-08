const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName)
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error)
                //await interaction.reply({
                    //content: `:no_entry_sign: Sorry, an unknown error occurred.`
                //});

                const embed = await interaction.deferReply({
                    fetchReply: true
                });
                const newEmbed = new EmbedBuilder()
                    .setTitle(`:no_entry_sign: Sorry, an unknown error occurred.`)
                    .setColor(0xFFA500)
                    .setTimestamp(Date.now())
                    .setDescription(`Know what happened? Submit an [Issue](https://github.com/notcreepers/cas-v14/issues/new)`)
                    .setFooter({
                        text: version
                    })
                    
                    await interaction.editReply({
                        embeds: [newEmbed]
                    });
            }
        }
    }
}