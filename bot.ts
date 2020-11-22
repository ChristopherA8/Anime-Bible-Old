// bot add link
// https://discord.com/oauth2/authorize?client_id=763464598959292458&scope=bot&permissions=515136

//Permissions site
// https://discordapi.com/permissions.html#8

//https://chr1s.dev/anime

const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.json');
const { prefix, token, topToken } = require('./config.json');
const client = new Discord.Client()
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));
//top.gg
const DBL = require('dblapi.js');
const dbl = new DBL(topToken, client);


//Include Command Files ending in .ts
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Runs once at startup
client.on('ready', () => {

  // Sets Bot Status
  console.log("Connected as " + client.user.tag + ", yo yo yo")
  //client.user.setActivity("with JavaScript", {type: "PLAYING"})
  client.user.setActivity(`//help in ${client.guilds.cache.size} servers`, {type: "PLAYING"})

  //top.gg
  setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
  }, 1800000);

});


client.on('message', msg => {

//Command Handler

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

//Top.gg API
 
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


  client.login(token)

