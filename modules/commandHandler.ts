module.exports = {
    commands(client, Discord, fs) {

        client.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

        // Include Command Files ending in .ts
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.name, command);
        }

    },
};