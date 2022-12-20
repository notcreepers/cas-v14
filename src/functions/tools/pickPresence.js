const { ActivityType } = require('discord.js');
module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Playing,
                text: `with Creepers' feelings`,
                status: "dnd"
            },
            {
                type: ActivityType.Listening,
                text: `to Creepers' tears`,
                status: "dnd"
            },
            {
                type: ActivityType.Watching,
                text: `Creepers cry`,
                status: "dnd"
            }
        ];
        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activites: [{
                
            }],
            name: options[option].text,
                type: options[option].type,
            status: options[option].status
        })
    };
};