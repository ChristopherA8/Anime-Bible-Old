const Discord7 = require('discord.js');
module.exports = {
    name: 'character',
    description: '',
    execute(msg, args) {

        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
        stats.character++;
        stats.total++;
        sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay);").run(stats);

        const fetch = require('node-fetch');

        var input = msg.content.substr(11);

        var searchURL = `https://api.jikan.moe/v3/search/character?q=${input}&page=1`;

        fetch(searchURL)
        .then(res => res.json())
        .then((api) => {
            const { name, image_url, url, mal_id } = api.results[0];

            var names = [];
            for (let index = 0; index < api.results[0].anime.length; index++) {
                if (api.results[0].anime.length <= 10) {
                    const element = api.results[0].anime[index];
                    names.push(`[${element.name}](${element.url})`);
                } else {
                    const element = api.results[0].anime[index];
                    if (names.length <= 9) {
                        names.push(`[${element.name}](${element.url})`);
                    } else if (names.length = 10) {
                        names.push(`[${element.name}](${element.url})\n**...**`);
                    }
                }
            }

            const animeUrl = api.results[0].anime[0].url;

            const aboutEmbed = new Discord7.MessageEmbed()
            .setAuthor(`${name}`, `${image_url}`,`${url}`)
            .setColor('#55128E')
            .setDescription(`Found in:\n${names.join("\n")}`)
            .setFooter(`MyAnimeList id: ${mal_id}`, `https://chr1s.dev/assets/animelist.png`)
            .setThumbnail(`${image_url}`)
            msg.channel.send(aboutEmbed)

        })
        .catch(handleError);

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid character name!`);
            //console.error(error);
        }

    },
}

/*
const aboutEmbed = new Discord7.MessageEmbed()
.setAuthor(`Quote from ${anime}:`, `https://chr1s.dev/assets/animelist.png`,`https://animechanapi.xyz/`)
.setColor('#02f2ce')
.setDescription(`${quote}\n **- ${character}**`)
msg.channel.send(aboutEmbed)
*/