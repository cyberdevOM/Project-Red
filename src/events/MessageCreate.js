const { Events, Message } = require('discord.js');
const { expCheck, exists } = require('../utils/userChecks');

// -------------------------------------------------------------
// This event listener listens for the message event 
// and checks if the user has enough xp to level up.

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const author = message.author;

        try {
            const userData = await exists(author); // userCecks check if user esists

            userData.exp += 25; // add 25 xp to the user

            await expCheck(author, userData); // userChecks check if exp --> level up and update info.
        } catch (error) {
            console.error('An error occurred:', error); // log error
        }
    }, 
}
