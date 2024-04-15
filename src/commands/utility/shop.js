const { SlashCommandBuilder, codeBlock} = require('discord.js');
const CurrencyShop = require('../../models/CurrencyShop');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('View the shop'),
    async execute(interaction) {
        const items = await CurrencyShop.findAll();
        return interaction.reply(codeBlock(items.map(item => `${item.name}: ${item.cost}`).join('\n')));
    }
}