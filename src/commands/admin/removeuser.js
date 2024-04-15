const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/Users');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove_user')
        .setDescription('Removes a user from the database.')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user to remove from the database.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target');

        if (interaction.user.id !== process.env.DEVELOPER_ID) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        } else {
            // Remove the user from the database
            const data = await User.destroy({ where: { user_id: target.id } });
        
            if (!data) return interaction.reply({ content: `The user ${target.displayName} was not found in the database.`, ephemeral: true });
            return interaction.reply({ content: `The user ${target.displayName} has been removed from the database.`, ephemeral: true });
        }
    },
};