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
                    name: `09/02/2023`,
                    value: `- Fixed the Moderation Logging, it can now send in multiple servers, as long as the channel is named "bot-log" (basically a band-aid fix, but a fix none the less).\n\n- Setup MongoDB even though my band-aid fix doesn't require it, the full fix in the future will.`,
                },
                {
                    name: `08/02/2023`,
                    value: `- Added Simple Moderation Logging (Banning/Unbanning, Kicking, Message Editing, Channel Creation/Deletion) \n\n- Changed the Error message to be an embed and direct the user to GitHub if they know what happened.`,
                },
                {
                    name: `21/12/2022`,
                    value: `- Fixed the hard crash that would occur whenever the bot would attempt to DM a user that was punished by moderator commands (ban, kick, or timeout) if they had DMs disabled and/or blocked the bot.\n\n- Made it so if there was an error punishing a user it throws an error instead of saying it was successful. \n\n- Added the Add to Server button in the user pop-out. `,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}