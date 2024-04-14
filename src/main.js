//! https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

const dotenv = require('dotenv');
dotenv.config();

const { Client, Collection, GatewayIntentBits} = require('discord.js'); // The discord.js module provides an easy interface for interacting with the Discord API.
const fs = require('fs'); // The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
const path = require('node:path'); // The path module provides utilities for working with file and directory paths.

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
    ],
}); // The Client class is the main class for interacting with the Discord API. 

//* command handler
client.commands = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
		const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//* event handler
const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

//* cooldowns
client.cooldowns = new Collection();

client.login(process.env.DISCORD_TOKEN);