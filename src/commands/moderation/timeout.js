const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeouts mentioned member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('The member you want to timeout.').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('The amount of minutes you want to timeout this member.'))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to timeout this member')),
    async execute(interaction, client) {
        
    
        
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        let time = interaction.options.getInteger("time")
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
        
        if (!reason) reason = "No reason given.";
        if (!time) time = null;
        
        const Embed = new EmbedBuilder()
            .setTitle(`You were timed out in: ${interaction.guild.name} for ${time} minutes. \nReason: ${reason}`)
            .setColor(0x000000)
            .setTimestamp(Date.now())
            .setFooter({
                text: `Version 0.0.1`
            })


        user.send({
            embeds: [Embed]
        }).catch(console.log('User\'s DMs are disabled, or an unknown error occurred.'));

        await member.timeout(time == null ? null : time * 60 * 1000, reason).catch(console.error);

        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`${user.tag} was timed out.`)
            .setColor(0x4CBB17)
            .setTimestamp(Date.now())
            .setFooter({
                text: `Version 0.0.1`
            })
            
            await interaction.editReply({
                embeds: [newEmbed]
            });
    },
};