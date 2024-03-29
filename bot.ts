/* =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/*                                                          */
/*                 Welcome to Anime Bible!                  */
/*             Written entirely in javascript               */
/*     Searches for Anime, Manga, Characters and more!      */
/*            Using the AniList.co GraphQL API              */
/*                                                          */
/*                     BOT WEBSITE:                         */
/*                https://chr1s.dev/anime                   */
/*                                                          */
/* =-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

// Constants
const fs = require("fs");
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require("./config.json");
const { prefix, token, topToken } = require("./config.json");
// const client = new Discord.Client();
const client = new Client({ intents: [Intents.NON_PRIVILEGED] });
const sanitizeHtml = require("sanitize-html");
const DBL = require("dblapi.js");
const dbl = new DBL(topToken, client);

// Custom Modules
const { commands } = require("./modules/commandHandler.ts");
commands(client, Discord, fs);

/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
/*         Slash Commands          */
/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

client.on(`interaction`, (interaction) => {
  const SQLite = require("better-sqlite3");
  const sql = new SQLite("./databases/stats.sqlite");
  const fetch = require("node-fetch");
  // console.log(interaction);
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case "anime":
      let anime = interaction.options[0].value;

      // Update SQLite database when someone uses the command

      var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
      stats.slashanime++;
      stats.total++;
      sql
        .prepare(
          "INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);"
        )
        .run(stats);

      var vars = {
        search: `${anime}`,
      };
      var query = `
      {
          Media(search: "${vars.search}", type: ANIME, isAdult: false) {
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
            genres
          }
        }
      `;
      var url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: vars,
          }),
        };
      fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
      function handleResponse(response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      }

      function handleData(results) {
        var dirty = results.data.Media.description.substring(0, 250);
        const desc = sanitizeHtml(dirty, {
          allowedTags: [],
          allowedAttributes: {},
        });

        const aboutEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${results.data.Media.title.romaji} (${results.data.Media.title.native})`,
            `https://anilist.co/img/icons/favicon-32x32.png`,
            `https://anilist.co`
          )
          .setColor("#55128E")
          .setDescription(`${desc}...`)
          .setFooter(
            `Total Episodes: ${results.data.Media.episodes}   |   Average Score: ${results.data.Media.averageScore}/100`,
            `https://chr1s.dev/assets/animelist.png`
          )
          .setThumbnail(`${results.data.Media.coverImage.extraLarge}`);
        if (
          results.data.Media.genres.includes("Ecchi") &&
          interaction.channel.nsfw == false
        ) {
          interaction.reply(`**Ecchi anime only allowed in NSFW channel**`);
        } else {
          interaction.reply(aboutEmbed);
        }
      }
      function handleError(error) {
        interaction.reply(`\**Error:\** Invalid anime name!`);
      }

      break;
    case "manga":
      let manga = interaction.options[0].value;
      // Update SQLite database when someone uses the command
      var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
      stats.slashmanga++;
      stats.total++;
      sql
        .prepare(
          "INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);"
        )
        .run(stats);
      var vars = {
        search: `${manga}`,
      };
      var query = `
      {
          Media(search: "${vars.search}", type: MANGA, isAdult: false) {
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
            genres
          }
        }
      `;
      var url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: vars,
          }),
        };
      fetch(url, options).then(handleRespon).then(handleDa).catch(handleErr);
      function handleRespon(response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      }
      function handleDa(results) {
        var dirty = results.data.Media.description.substring(0, 250);
        const desc = sanitizeHtml(dirty, {
          allowedTags: [],
          allowedAttributes: {},
        });

        const aboutEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${results.data.Media.title.romaji} (${results.data.Media.title.native})`,
            `https://anilist.co/img/icons/favicon-32x32.png`,
            `https://anilist.co`
          )
          .setColor("#55128E")
          .setDescription(`${desc}...`)
          .setFooter(
            `Average Score: ${results.data.Media.averageScore}/100`,
            `https://chr1s.dev/assets/animelist.png`
          )
          .setThumbnail(`${results.data.Media.coverImage.extraLarge}`);
        if (
          results.data.Media.genres.includes("Ecchi") &&
          interaction.channel.nsfw == false
        ) {
          interaction.reply(`**Ecchi manga only allowed in NSFW channel**`);
        } else {
          interaction.reply(aboutEmbed);
        }
      }

      function handleErr(error) {
        interaction.reply(`\**Error:\** Invalid manga name!`);
      }

      break;
    default:
      console.log(`Unnamed slash command recieved`);
      break;
  }
});

client.on("ready", () => {
  // Sets Bot Status
  console.log("Connected as " + client.user.tag + ", yo yo yo"); // Make sure the bot connects
  client.user.setActivity(`//help in ${client.guilds.cache.size} servers`, {
    type: "PLAYING",
  });
  // client.user.setActivity(`Thank you for ${client.guilds.cache.size} servers!!!`, {type: "PLAYING"})

  //top.gg
  setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
  }, 1800000);

  var fetch = require("node-fetch");
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc2MzQ2NDU5ODk1OTI5MjQ1OCIsImlhdCI6MTYwNjIzODgzN30.eK21K_JgLTIPlV1eUp72XycWFHmkxGfSVa_HhketADI",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async function postMoreData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiMjc5MDMyOTMwOTI2NTkyMDAwIiwiaWF0IjoxNjE0OTYyNTMzfQ.BuPBJMSlRTSlTzrCyXumAWodC6uZZM1dWENQpm-YWoc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  // postMoreData(`https://discord.bots.gg/api/v1/bots/763464598959292458/stats`, {
  //   guildCount: client.guilds.cache.size,
  //   shardCount: client.shard.count,
  // }).then((data) => {
  //   console.log(data);
  // });
  /*
  postData(`https://discordbotlist.com/api/v1/bots/763464598959292458/stats`, {
    guilds: client.guilds.cache.size,
  }).then((data) => {
    console.log(data);
  }); */
});

client.on("message", (msg) => {
  //Command Handler
  if (!msg.content.startsWith(prefix) || msg.author.bot) return; // Ignore other bots and messages w/o prefix
  const args = msg.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase(); // Make lowercase
  if (!client.commands.has(commandName)) return; // Ignore extraneous commands or misspelling
  const command = client.commands.get(commandName); // Set Command
  if (command.args && !args.length) {
    return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
  }
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    const user = client.users.cache.get("279032930926592000"); // christopher#8888 user id
    user.send(`**Crashlog:** \n${error}`); // Send christopher#8888 crashlog
  }
});

//Top.gg API
dbl.on("posted", () => {
  console.log("Server count posted!");
});

dbl.on("error", (e) => {
  console.log(`Oops! ${e}`);
});

client.login(token);
