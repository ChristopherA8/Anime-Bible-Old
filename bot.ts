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
const sanitizeHtml = require('sanitize-html');
//top.gg
const DBL = require('dblapi.js');
const dbl = new DBL(topToken, client);


//Include Command Files ending in .ts
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// slash commands

  // Slash Commands YAYAYAYYAYY
  const discordJsHandlers = require('./node_modules/discord.js/src/client/websocket/handlers/index');

  var type;
  var anime;
  var guildID;
  var channelID;
  discordJsHandlers.INTERACTION_CREATE = (_client, { d: packetData }) => {
    // console.log(`Data: ${JSON.stringify(packetData.data)}`);
    type = packetData.data.name;
    anime = packetData.data.options[0].value;
    // console.log(`Member: ${JSON.stringify(packetData.member)}`);
    // console.log(`Channel_ID: ${JSON.stringify(packetData.channel_id)}`);
    channelID = packetData.channel_id;
    // console.log(`Guild_ID: ${JSON.stringify(packetData.guild_id)}`);
    guildID = packetData.guild_id;
    if (type == 'anime') {
      animeEmbed(guildID, channelID);
    } else if (type == 'manga') {
      mangaEmbed(guildID, channelID);
    }
  };

  function animeEmbed(guild_id, channel_id) {
    var guild = client.guilds.cache.find(guild => guild.id == guild_id)
    // var channel = guild.channels.cache.filter(channel => channel.id == channel_id)
    var channel = guild.channels.cache.get(channel_id)
    //////////////////////////////////////////////////////////////////////////

    const SQLite = require('better-sqlite3');
    const sql = new SQLite('./databases/stats.sqlite');
    var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
    stats.slashanime++;
    stats.total++;
    sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);").run(stats);

    const fetch = require('node-fetch');
    // Define our query variables and values that will be used in the query request
    var vars = {
      search: `${anime}`,
  };

  // Here we define our query as a multi-line string
  var query = `
  {
      Media(search: "${vars.search}", type: ANIME) {
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        description(asHtml: false)
        episodes
        averageScore
      }
    }
  `;

  // Define the config we'll need for our Api request
  var url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: query,
              variables: vars
          })
      };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse)
  .then(handleData)
  .catch(handleError);

  function handleResponse(response) {
      return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
      });
  }

  function handleData(results) {

      //var desc = results.data.Media.description.substring(0,100);

      var dirty = results.data.Media.description.substring(0,250);
      const desc = sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} });
      //var desc = results.data.Media.description.substring(0,250).replace(/&mdash;/gi, "-").replace(/&ndash;/gi, "-").replace( /(<([^>]+)>)/ig, '');



      const aboutEmbed = new Discord.MessageEmbed()
      //.setTitle(`About Anime List`)
      //.setURL(`https://chr1s.dev`)
      .setAuthor(`${results.data.Media.title.romaji} (${results.data.Media.title.native})`, `https://anilist.co/img/icons/favicon-32x32.png`,`https://anilist.co`)
      .setColor('#55128E')
      .setDescription(`${desc}...`)
      .setFooter(`Total Episodes: ${results.data.Media.episodes}   |   Average Score: ${results.data.Media.averageScore}/100`, `https://chr1s.dev/assets/animelist.png`)
      .setThumbnail(`${results.data.Media.coverImage.extraLarge}`)
      channel.send(aboutEmbed)

  }

  function handleError(error) {
      channel.send(`\**Error:\** Invalid anime name!`);
      //console.error(error);
  }

    //////////////////////////////////////////////////////////////////////////
  }

  function mangaEmbed(guild_id, channel_id) {
    var guild = client.guilds.cache.find(guild => guild.id == guild_id)
    // var channel = guild.channels.cache.filter(channel => channel.id == channel_id)
    var channel = guild.channels.cache.get(channel_id)
    //////////////////////////////////////////////////////////////////////////

    const SQLite = require('better-sqlite3');
    const sql = new SQLite('./databases/stats.sqlite');
    var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
    stats.slashmanga++;
    stats.total++;
    sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);").run(stats);

    const fetch = require('node-fetch');
        // Define our query variables and values that will be used in the query request
        var vars = {
          search: `${anime}`,
      };

            // Here we define our query as a multi-line string
            var query = `
            {
                Media(search: "${vars.search}", type: MANGA) {
                  coverImage {
                    extraLarge
                    large
                    medium
                    color
                  }
                  title {
                    romaji
                    english
                    native
                    userPreferred
                  }
                  description(asHtml: false)
                  episodes
                  averageScore
                }
              }
            `;
    
            // Define the config we'll need for our Api request
            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: vars
                    })
                };
    
            // Make the HTTP Api request
            fetch(url, options).then(handleRespon)
            .then(handleDa)
            .catch(handleErr);
    
            function handleRespon(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
    
            function handleDa(results) {
    
                //var desc = results.data.Media.description.substring(0,100);
                var dirty = results.data.Media.description.substring(0,250);
                const desc = sanitizeHtml(dirty, { allowedTags: [], allowedAttributes: {} });
                //var desc = results.data.Media.description.substring(0,250).replace(/<br>/gi, "");
    
                const aboutEmbed = new Discord.MessageEmbed()
                //.setTitle(`About Anime List`)
                //.setURL(`https://chr1s.dev`)
                .setAuthor(`${results.data.Media.title.romaji} (${results.data.Media.title.native})`, `https://anilist.co/img/icons/favicon-32x32.png`,`https://anilist.co`)
                .setColor('#55128E')
                .setDescription(`${desc}...`)
                .setFooter(`Average Score: ${results.data.Media.averageScore}/100`, `https://chr1s.dev/assets/animelist.png`)
                .setThumbnail(`${results.data.Media.coverImage.extraLarge}`)
                channel.send(aboutEmbed)
    
            }
    
            function handleErr(error) {
                channel.send(`\**Error:\** Invalid manga name!`);
                //console.error(error);
            }

            ////////////////////////////////////////////////////////////


  }

// Runs once at startup
client.on('ready', () => {

  // Sets Bot Status
  console.log("Connected as " + client.user.tag + ", yo yo yo")
  client.user.setActivity(`//help in ${client.guilds.cache.size} servers`, {type: "PLAYING"})
  //client.user.setActivity(`Quick Maintenance - will be back up soon!`, {type: "PLAYING"});
  //client.user.setActivity(`//help in 500000 servers`, {type: "PLAYING"})

  //top.gg
  setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
  }, 1800000);

var fetch = require('node-fetch');
  // Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc2MzQ2NDU5ODk1OTI5MjQ1OCIsImlhdCI6MTYwNjIzODgzN30.eK21K_JgLTIPlV1eUp72XycWFHmkxGfSVa_HhketADI',
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData(`https://discordbotlist.com/api/v1/bots/763464598959292458/stats`, { guilds: client.guilds.cache.size })
.then(data => {
  console.log(data); // JSON data parsed by `data.json()` call
});



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
    user.send(`**Crashlog:** \n${error}`);
	  //msg.reply(`\**Crashlog:\** ${error}`);
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

