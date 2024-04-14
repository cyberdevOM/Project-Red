const { Events, Message } = require('discord.js');
const User = require('../models/Users');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const author = message.author;

        try {
            let user = await User.findOne({ where: { user_id: author.id } });

            if (!user) {
                user = await User.create({ 
                    user_id: author.id, 
                    username: author.username,
                    balance: 0,
                    exp: 0,
                    level: 0,
                    expToNextLevel: 100,
                });
            }

            user.exp += 50;

            if (user.exp >= user.expToNextLevel) {
                user.level += 1;
                user.exp = 0;
                user.expToNextLevel = Math.pow(2, user.level) * 100;
            }

            await User.update({
                balance: user.balance + 1,
                exp: user.exp,
                level: user.level,
                expToNextLevel: user.expToNextLevel,
            }, {
                where: { user_id: author.id },
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, 
}
