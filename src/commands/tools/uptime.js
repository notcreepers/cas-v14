const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Displays bot uptime'),
    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60
        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`${client.user.username}'s Uptime`)
            .setColor(0x32CD32)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })
            .addFields([
                {
                    name: `Uptime`,
                    value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.`,
                    inline: true
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}