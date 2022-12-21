const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified amount of messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages you want to delete.').setMinValue(1).setRequired(true)),
    async execute(interaction, client) {
        
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        await interaction.channel.bulkDelete(amount).catch(console.error);

        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`${amount} messages were deleted.`)
            .setColor(0x4CBB17)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}