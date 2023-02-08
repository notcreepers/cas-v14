const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { version } = process.env;
const message = 'There was a problem kicking this user.'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans the mentioned member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('target').setDescription('The member you want to ban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to ban this member')),
    async execute(interaction, client) {
        
    
        
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);
        
        if (!reason) reason = "No reason given.";

        const Embed = new EmbedBuilder()
            .setTitle(`You've been banned from: ${interaction.guild.name}\nReason: ${reason}`)
            .setColor(0x000000)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })


        user.send({
            embeds: [Embed]
        }).catch((err) => {console.log('User\'s DMs are disabled, or an unknown error occurred.')});

        await member.ban({
            deleteMessageDays: 1,
            reason: reason
        }).catch((err) => {reply({
            content: message
        });});

        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`${user.tag} was banned.`)
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