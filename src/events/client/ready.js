module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        setInterval(client.pickPresence, 10 * 1000);
        console.log(`it's a boy, ${client.user.tag} is here`);
    }
}