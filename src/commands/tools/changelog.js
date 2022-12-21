const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription('Displays up to the last 3 updates to the bot.'),
    async execute(interaction, client) {
        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`Changelog`)
            .setColor(0xADD8E6)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })
            .addFields([
                {
                    name: `20/12/2022`,
                    value: `Added 3 basic commands: changelog, permission, and info. And 4 moderation commands: ban, kick, timeout, and purge`,
                },
                {
                    name: `19/12/2022`,
                    value: `Remade the bot in discord.js v14, and added a basic ping and pingembed command.`,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}