const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pingembed')
        .setDescription('Sends Bot Latency as an Embed'),
    async execute(interaction, client) {
        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`:ping_pong: Pong!`)
            .setColor(0xFFA500)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })
            .addFields([
                {
                    name: `API Latency`,
                    value: `${client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: `Client Ping`,
                    value: `${embed.createdTimestamp - interaction.createdTimestamp}ms`,
                    inline: true
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}