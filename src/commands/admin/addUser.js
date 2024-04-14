const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/Users');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adduser')
        .setDescription('Add a user to the database')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to add')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        
        try {
            const newUser = await Users.create({
                user_id: user.id,
                username: user.username,
                balance: 0,
                exp: 0,
                level: 0,
                expToNextLevel: 100,
            });
            return interaction.reply({ content: `User ${newUser.username} added.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error trying to add that user!', ephemeral: true });
        }
    }
};