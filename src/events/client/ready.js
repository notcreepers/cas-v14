const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        //setInterval(client.pickPresence, 10 * 1000);
        client.user.setActivity('Creepers cry', { type: ActivityType.Watching });
        client.user.setStatus('dnd');
        console.log(`it's a boy, ${client.user.tag} is here`);
    },
};