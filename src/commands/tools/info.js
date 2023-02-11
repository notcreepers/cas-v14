const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { version } = process.env;
const cpuStat = require("cpu-stat");
const errEmbed = require('../../events/client/interactionCreate');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Sends info about the bot'),
    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60


        cpuStat.usagePercent(async (error, percent) => {
            if(error) return interaction.reply({ embeds: [errEmbed] })
        
        const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
        const cpu = percent.toFixed(2)
        const embed =  await interaction.deferReply({
            fetchReply: true
        })
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
                    name: `Uptime`,
                    value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.`,
                    inline: true
                },
                {
                    name: `API Latency`,
                    value: `${client.ws.ping}ms`,
                },
                {
                    name: `Client Ping`,
                    value: `${embed.createdTimestamp - interaction.createdTimestamp}ms`,
                },
                {
                    name: `CPU Usage`,
                    value: `${cpu}%`,
                },
                {
                    name: `Memory Usage`,
                    value: `${memoryUsage}`,
                }
            ]);
            await interaction.editReply({
                embeds: [newEmbed]
            });

            function formatBytes(a, b) {
                let c = 1024
                d = b || 2
                e = ['B', 'KB', 'MB', 'GB', 'TB']
                f = Math.floor(Math.log(a) / Math.log(c))

                return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
            }
        })
    }
}