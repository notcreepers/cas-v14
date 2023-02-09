const Guild = require('../../schemas/guild');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Returns info from MongoDB')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('logchannelid').setDescription('Enter the Log Channel ID').setRequired(true)),
    async execute(interaction, client) {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id});
        let logChannel = interaction.options.getString('logchannelid');
        if (!guildProfile) guildProfile = await new Guild({
            _id: mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            guildName: interaction.guild.name,
            logChannel: (logChannel),

        });

        await guildProfile.save().catch(console.error);
        await interaction.reply({
            content: `Server Name: ${guildProfile.guildName}`
        });
        console.log(guildProfile);
    }
}