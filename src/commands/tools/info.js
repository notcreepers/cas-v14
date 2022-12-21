const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Sends info about the bot'),
    async execute(interaction, client) {
        const embed = await interaction.deferReply({
            fetchReply: true
        });
        const newEmbed = new EmbedBuilder()
            .setTitle(`:robot: Bot Information`)
            .setColor(0xFFA500)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })
            .addFields([
                {
                    name: `Developer`,
                    value: `[Creepers#0001](https://linktr.ee/notcreepers)`,
                },
                {
                    name: `Bot ID`,
                    value: `530934512675192842`,
                },
                {
                    name: `Server Name`,
                    value: `${interaction.guild.name}`,
                },
                
                {
                    name: `API Latency`,
                    value: `${client.ws.ping}`,
                },
                {
                    name: `Client Ping`,
                    value: `${embed.createdTimestamp - interaction.createdTimestamp}`,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });
    }
}