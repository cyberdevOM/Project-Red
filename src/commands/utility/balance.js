const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/Users');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance'),
    async execute(interaction) {
        const user = await User.findOne({ where: { user_id: interaction.user.id } });

        return interaction.reply({ content: `Your balance is £${user.balance}`, ephemeral: true});
    }
}