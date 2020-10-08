// bot add link


//Permissions site
// https://discordapi.com/permissions.html#8

const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client()
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));



//Include Command Files ending in .js
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Runs once at startup
client.on('ready', () => {

    // Sets Bot Status
    console.log("Connected as " + client.user.tag + ", yo yo yo")
    //client.user.setActivity("with JavaScript", {type: "PLAYING"})
    client.user.setActivity("//help", {type: "STREAMING"})


});

//Runs when a member joins a guild
client.on('guildMemberAdd', join => {

  //join.send(`Welcome to ${join.guild.name}!`);
  //const role = join.member.guild.roles.cache.get('605516657837867145');
  //join.member.roles.add(role);

});


client.on('message', msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
  	return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
  }

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    const user = client.users.cache.get('279032930926592000');
    //user.send(`**Crashlog:** \n${error}`);
	  msg.reply(`\**Crashlog:\** ${error}`);
  }


});

  client.login(token)

