const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const { version } = process.env;
const { errEmbed } = require('../../events/client/interactionCreate');
const message = 'There was a problem kicking this user.'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans the mentioned member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => option.setName('userid').setDescription('The user ID of the member you want to unban.').setRequired(true)),
    async execute(interaction) {
            const {channel, options} = interaction;

            const userID = options.getString("userid");

            try {
                await interaction.guild.members.unban(userID);
                
                const embed = await interaction.deferReply({
                    fetchReply: true
                });
                const newEmbed = new EmbedBuilder()
                    .setTitle(`User with the ID ${userID} was unbanned.`)
                    .setColor(0x4CBB17)
                    .setTimestamp(Date.now())
                    .setFooter({
                        text: version
                    })
                    
                    await interaction.editReply({
                        embeds: [newEmbed]
                    });
            } catch(err) {
                console.log(err);

                interaction.reply({ embeds: [errEmbed] });
            }
    }}