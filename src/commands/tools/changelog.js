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
                    name: `13/06/2023`,
                    value: `- Disabled Message Edit Logging, due to an issue with the new username system.\n\n- Updated the info command to show Creepers' new username over the old Discord tag.`,
                },
                {
                    name: `10/02/2023`,
                    value: `- Added an uptime command, revamped the info command to include the uptime and CPU and Memory Usage. Also added ms (milliseconds) to the end of everywhere the ping and API latency is shown.`,
                },
                {
                    name: `09/02/2023`,
                    value: `- Fixed the Moderation Logging, it can now send in multiple servers, as long as the channel is named "bot-log" (basically a band-aid fix, but a fix none the less).\n\n- Setup MongoDB even though my band-aid fix doesn't require it, the full fix in the future will.\n\n- Disabled Kick Logging, as it shouldn't be sending when bans occur. Added an unban command.`,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}