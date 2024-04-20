const { SlashCommandBuilder } = require('discord.js');
const { Users , UserItems, CurrencyShop, PetShop, UserPet }= require('../../utils/dbObjects');
//const CurrencyShop = require('../../models/CurrencyShop');
const { balanceCheck, balanceUpdate, exists } = require('../../utils/userChecks');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Buy an item')
        .addSubcommand(subcommand =>
            subcommand
                .setName('item')
                .setDescription('The item you want to buy')
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pet')
                .setDescription('The pet you want to buy')
                .addStringOption(option =>
                    option
                        .setName('pet')
                        .setDescription('The pet you want to buy')
                        .setRequired(true)
                        .addChoices(
                            {name: "dog", value: "dog"},
                            {name: "cat", value: "cat"},
                            {name: "hamster", value: "hamster"},
                            {name: "rabbit", value: "rabbit"},
                            {name: "parrot", value: "parrot"},
                            {name: "goldfish", value: "goldfish"},
                            {name: "turtle", value: "turtle"},
                            {name: "chinchilla", value: "chinchilla"},
                            {name: "ferret", value: "ferret"},
                            {name: "hedgehog", value: "hedgehog"}
                        )
                ),
        ),

    async execute(interaction) {
        const user = await exists(interaction.user);
        
        if (interaction.options.getSubcommand() === 'item') {
            const item = await CurrencyShop.findOne({ where: { name: interaction.options.getString('item')} });
            const userItems = await UserItems.findAll({ where: { user_id: interaction.user.id }})


            if (!item) return interaction.reply({ content: 'That item does not exist.', ephemeral: true });
            if (item.cost > user.balance) return interaction.reply({ content: 'You do not have enough money to buy this item.', ephemeral: true });
            let foundItem = userItems.find(ui => ui.item_name === item.name);
            if (foundItem) {
                foundItem.amount += 1;
                await foundItem.save();
            } else {
                await user.addItem(item);
            }
            user.balance -= item.cost;
            await balanceUpdate(interaction.user, user);

            return interaction.reply({ content: `You have bought ${item.name}.`, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'pet') {
            const pet = await PetShop.findOne({ where: { name: interaction.options.getString('pet')} });
            const userPets = await UserPet.findAll({ where: { user_id: interaction.user.id }})

            if (!pet) return interaction.reply({ content: 'That pet does not exist.', ephemeral: true });
            if (pet.cost > user.balance) return interaction.reply({ content: 'You do not have enough money to buy this pet.', ephemeral: true });
            let foundPet = userPets.find(up => up.pet_name === pet.name);
            if (foundPet) {
                return await interaction.reply({ content: 'You already have this pet.', ephemeral: true });
            } else {
                await user.addPet(pet);
            }

            user.balance -= pet.cost;
            await balanceUpdate(interaction.user, user);

            return await interaction.reply({ content: `You have bought ${pet.name}.`, ephemeral: true });
        }
    }
}