const { SlashCommandBuilder } = require('discord.js');
const { Users , UserItems, CurrencyShop }= require('../../utils/dbObjects');
//const CurrencyShop = require('../../models/CurrencyShop');
const { balanceCheck, balanceUpdate, exists } = require('../../utils/userChecks');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Buy an item')
        .addStringOption(option =>
            option
                .setName('item')
                .setDescription('The item you want to buy')
                .setRequired(true)
                .addChoices(
                    {name: "cake", value: "cake"},
                    {name: "cookie", value: "cookie"},
                    {name: "muffin", value: "muffin"},
                    {name: "pie", value: "pie"},
                    {name: "brownie", value: "brownie"},
                    {name: "donut", value: "donut"},
                    {name: "cupcake", value: "cupcake"},
                    {name: "bread", value: "bread"},
                    {name: "croissant", value: "croissant"},
                    {name: "bagel", value: "bagel"}
                )
        ),
    async execute(interaction) {
        const user = await exists(interaction.user);
        const item = await CurrencyShop.findOne({ where: { name: interaction.options.getString('item')} });

        if (!item) return interaction.reply({ content: 'That item does not exist.', ephemeral: true });
        if (item.cost > user.balance) return interaction.reply({ content: 'You do not have enough money to buy this item.', ephemeral: true });

        user.balance -= item.cost;
        await balanceUpdate(interaction.user, user);
        await user.addItem(item);

        return interaction.reply({ content: `You have bought ${item.name}.`, ephemeral: true });
    }
}