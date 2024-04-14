const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(Client) {
        console.log(`Ready! Logged in as ${Client.user.tag}`);
    },
};