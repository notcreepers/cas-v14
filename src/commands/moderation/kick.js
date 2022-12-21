const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks mentioned member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => option.setName('target').setDescription('The member you want to kick.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to kick this member')),
    async execute(interaction, client) {
        
    
        
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
        
        if (!reason) reason = "No reason given.";

        const Embed = new EmbedBuilder()
            .setTitle(`You've been kicked from: ${interaction.guild.name}\nReason: ${reason}`)
            .setColor(0x000000)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })


        user.send({
            embeds: [Embed]
        }).catch(console.log('user\'s DMs are disabled, or an unknown error occurred.'));

        await member.kick(reason).catch(console.error);

        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`${user.tag} was kicked.`)
            .setColor(0x4CBB17)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })
            
            await interaction.editReply({
                embeds: [newEmbed]
            });
    },
};