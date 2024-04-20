const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Users , UserItems, CurrencyShop, UserPet}= require('../../utils/dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('View your inventory'),
    async execute(interaction) {
        const items = await UserItems.findAll({ where: { user_id: interaction.user.id } });
        const pets = await UserPet.findAll({ where: { user_id: interaction.user.id}})

        if (!items.length) return interaction.reply({ content: 'Your inventory is empty.', ephemeral: true });
        
        //console.log(items);
        const itemString = items.map(i => `${i.amount} ${i.item_name}`).join('\n');
        const petString = pets.map(p => `${p.pet_name}`).join('\n');

        const embed = new EmbedBuilder()
            .setColor('#42d6be')
            .setTitle(`${interaction.user.username}'s Inventory`)
            .addFields(
                {name: 'Items', value: itemString ? itemString : 'No items', inline: true},
                {name: 'Pets', value: petString ? petString : 'No pets', inline: true}
            );
        
        return await interaction.reply({ embeds: [embed] });
    }
}