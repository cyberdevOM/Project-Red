const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const CurrencyShop = require('../../models/CurrencyShop');
const petShop = require('../../models/PetShop');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('View the shop')
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('The type of shop you want to view')
                .setRequired(false)
                .addChoices(
                    {name: 'Items', value: 'items'},
                    {name: 'Pets', value: 'pets'}
                )
        ),
    async execute(interaction) {
        const items = await CurrencyShop.findAll();
        const pets = await petShop.findAll();

        const shopItems = items.map(item => `${item.name}: ${item.cost}`).join('\n');
        const shopPets = pets.map(pet => `${pet.name}: ${pet.cost}`).join('\n'); 

        const shopEmbed = new EmbedBuilder()
            //.setColor('#42d6be')
            .setTitle('Shop')
            .setDescription('Welcome to the shop!')

        if (interaction.options.getString('type') === 'items') {
            shopEmbed.addFields({name:'Items', value: shopItems ? shopItems : 'No items'});
        } else if (interaction.options.getString('type') === 'pets') {
            shopEmbed.addFields({name: 'Pets', value: shopPets ? shopPets : 'No pets'});
        } else {
            shopEmbed
                .addFields(
                    {name: 'Items', value: shopItems ? shopItems : 'No items', inline: true},
                    {name: 'Pets', value: shopPets ? shopPets : 'No pets', inline: true}
                );
        }

        await interaction.reply({ embeds: [shopEmbed] });
    }
}