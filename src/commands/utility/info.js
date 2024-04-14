const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { User } = require('../../models/Users');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Provides information')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Provides information about the user.')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('The user to get information about.')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Provides information about the server.')
        ),
    async execute(interaction) {
        const serverInfo = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
            // .setColor('GREEN')
            .setAuthor({
                name: interaction.guild.name, 
                iconURL: interaction.guild.iconURL()
            })
            .setTimestamp();
        
        let account;
        if (interaction.options.addUserOption('target')) {
            account = interaction.option.getuserOption('target');
        } else {
            account = interaction.user;
        }

        let user = await User.findOne({ where: { user_id: account.id } });
        
        const userInfo = new EmbedBuilder()
            .setTitle('User Information')
            .setDescription(`User profile of user ${account.username}.`)
            .setThumbnail(account.avatarURL())
            .addFields(
                { name: `balance`, value: `${user.balance}`},
                { name: 'level', value: `${user.level}`, inline: true},
                { name: 'experience', value: `${user.exp}/${user.expToNextLevel}`, inline: true},
            )
            .setColor('0099FF')
            .setFooter({ text: `ID: ${account.id}`, iconURL: account.avatarURL()})
            .setTimestamp();
 
        switch (interaction.options.getSubcommand()) {
            case 'user':
                await interaction.reply({ embeds: [userInfo] });
                break;
            case 'server':
                await interaction.reply({ embeds: [serverInfo] });
                break;
        }
    },
};