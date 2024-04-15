const { SlashCommandBuilder } = require('discord.js');
const { Users, UserItems, CurrencyShop } = require('../../utils/dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcoins')
        .setDescription('Add coins to a user')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of coins to add').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('The user to add coins to')),
    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const user = target ? target : interaction.user;
        const userData = await Users.findOne({ where: { user_id: user.id } });
        const amount = interaction.options.getInteger('amount');

        if (!userData) {
            return interaction.reply({ content: 'That user does not exist in the database.', ephemeral: true });
        }

        userData.balance += amount;
        await Users.update({
            balance: userData.balance,
        }, {
            where: { user_id: user.id },
        });

        return interaction.reply({ content: `Successfully added ${amount} coins to ${user.username}'s balance.`, ephemeral: true });
    }
};