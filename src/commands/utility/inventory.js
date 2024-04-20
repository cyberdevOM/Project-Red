const { SlashCommandBuilder } = require('discord.js');
const { Users , UserItems, CurrencyShop }= require('../../utils/dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory'),
    async execute(interaction) {
        const items = await UserItems.findAll({ where: { user_id: interaction.user.id } });
        const pets = await UserPets.findAll({ where: { user_id: interaction.user.id}})

        if (!items.length) return interaction.reply({ content: 'Your inventory is empty.', ephemeral: true });
        
        //console.log(items);
        const itemString = items.map(i => `${i.amount} ${i.item_name}`).join(', ');
        const petString = pets.map(p => `${p.amount} ${p.item_name}`).join(', ');


        const embed = new MessageEmbed()
            .setTitle(`${interaction.user.username}'s Inventory`)
            .addField('Items', itemString ? itemString : 'No items')
            .addField('Pets', petString ? petString : 'No pets');
    }
}