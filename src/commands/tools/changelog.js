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
                    name: `10/02/2023`,
                    value: `- Added an uptime command, revamped the info command to include the uptime and CPU and Memory Usage. Also added ms (milliseconds) to the end of everywhere the ping and API latency is shown.`,
                },
                {
                    name: `09/02/2023`,
                    value: `- Fixed the Moderation Logging, it can now send in multiple servers, as long as the channel is named "bot-log" (basically a band-aid fix, but a fix none the less).\n\n- Setup MongoDB even though my band-aid fix doesn't require it, the full fix in the future will.\n\n- Disabled Kick Logging, as it shouldn't be sending when bans occur. Added an unban command.`,
                },
                {
                    name: `08/02/2023`,
                    value: `- Added Simple Moderation Logging (Banning/Unbanning, Kicking, Message Editing, Channel Creation/Deletion) \n\n- Changed the Error message to be an embed and direct the user to GitHub if they know what happened.`,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}