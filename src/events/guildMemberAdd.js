const { Events } = require('discord.js');
const { Users } = require('../utils/dbObjects');

module.exports = {
    name: Events.GUILD_MEMBER_ADD,
    async execute(member) {
        const guild = member.guild;
        const user = member.user;
        const channel = guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;
        channel.send(`Welcome to the server, ${user}`);

        try {
            await Users.create({
                id: user.id,
                username: user.username,
                balance: 0,
                exp: 0,
                level: 0,
                expToNextLevel: 100,
            });
        } catch (err) {
            console.error('Error adding user to database:', err);
        }
    },
};