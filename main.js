require('dotenv').config();
const { token } = process.env;
const { version } = process.env;
const { Client, Collection, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Events, GuildMember, GuildHubType, AuditLogEvent } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./src/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);



client.on(Events.GuildBanAdd, async member => {

    member.guild.fetchAuditLogs({
        type: AuditLogEvent.GuildBanAdd,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = member.user.username;
        const id = member.user.id;

        const channelID = '1072926331567882312';
        const mChannel = await member.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Member Banned`)
        .addFields({ name: "Member Name", value: `${name} (<@${id}>)`})
        .addFields({ name: "Member ID", value: `${id}`})
        .addFields({ name: "Banned By", value: `${executor.tag}`})
            .setColor(0xFF0000)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})

client.on(Events.GuildBanRemove, async member => {

    member.guild.fetchAuditLogs({
        type: AuditLogEvent.GuildBanRemove,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = member.user.username;
        const id = member.user.id;

        const channelID = '1072926331567882312';
        const mChannel = await member.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Member Unbanned`)
        .addFields({ name: "Member Name", value: `${name} (<@${id}>)`})
        .addFields({ name: "Member ID", value: `${id}`})
        .addFields({ name: "Unbanned By", value: `${executor.tag}`})
            .setColor(0x4CBB17)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})

/*
client.on(Events.MessageUpdate, async (message, newMessage) => {

    message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageUpdate,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const mes = message.content;

        if (!mes) return;

        const channelID = '1072926331567882312';
        const mChannel = await message.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Message Edited`)
        .addFields({ name: "User", value: `${executor.tag}`})
        .addFields({ name: "Old Message", value: `${mes}`})
        .addFields({ name: "New Message", value: `${newMessage}`})
            .setColor(0x0288d1)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})

*/

client.on(Events.ChannelCreate, async channel => {

    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Forum'
        if (type == 5) type = 'Announcement'
        if (type == 5) type = 'Category'

        const channelID = '1072926331567882312';
        const mChannel = await channel.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Channel Created`)
        .addFields({ name: "Channel Name", value: `${name} (<#${id}>)`})
        .addFields({ name: "Channel Type", value: `${type}`})
        .addFields({ name: "Channel ID", value: `${id}`})
        .addFields({ name: "Created By", value: `${executor.tag}`})
            .setColor(0x4CBB17)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})

client.on(Events.ChannelDelete, async channel => {

    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Forum'
        if (type == 5) type = 'Announcement'
        if (type == 5) type = 'Category'

        const channelID = '1072926331567882312';
        const mChannel = await channel.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Channel Deleted`)
        .addFields({ name: "Channel Name", value: `${name}`})
        .addFields({ name: "Channel Type", value: `${type}`})
        .addFields({ name: "Channel ID", value: `${id}`})
        .addFields({ name: "Deleted By", value: `${executor.tag}`})
            .setColor(0xFF0000)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})

client.on(Events.GuildMemberRemove, async member => {

    member.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberKick,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = member.user.username;
        const id = member.user.id;

        const channelID = '1072926331567882312';
        const mChannel = await member.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
        .setTitle(`Member Kicked`)
        .addFields({ name: "Member Name", value: `${name} (<@${id}>)`})
        .addFields({ name: "Member ID", value: `${id}`})
        .addFields({ name: "Kicked By", value: `${executor.tag}`})
            .setColor(0xFF0000)
            .setTimestamp(Date.now())
            .setFooter({
                text: version
            })

            mChannel.send({ embeds: [embed] })
    })
})