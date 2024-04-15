const { SlashCommandBuilder } = require('discord.js');
const { Users , UserItems, CurrencyShop }= require('../../utils/dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory'),
    async execute(interaction) {
        const items = await UserItems.findAll({ where: { user_id: interaction.user.id } });

        if (!items.length) return interaction.reply({ content: 'Your inventory is empty.', ephemeral: true });
        
        console.log(items);
        const itemString = items.map(i => `${i.amount} ${i.item_name}`).join(', ');
        return interaction.reply({ content: `You have: ${itemString}`, ephemeral: true });
    }
}