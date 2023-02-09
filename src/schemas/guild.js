const { Schema, model } = require('mongoose');
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    logChannel: String,
});

module.exports = model("Guilds", guildSchema, "guilds");