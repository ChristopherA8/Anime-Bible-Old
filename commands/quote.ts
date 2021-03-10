const Discord6 = require('discord.js');
module.exports = {
    name: 'quote',
    execute(msg, args) {
	
        // Update SQLite database when someone uses the command
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
        stats.quote++;
        stats.total++;
        sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);").run(stats);

        const fetch = require('node-fetch');
        var input = msg.content.substr(8);

        if (input === "") {
            var url = `https://animechan.vercel.app/api/random`;
        } else {
            var url = `https://animechan.vercel.app/api/quotes/anime?title=${input}`;
        }

        fetch(url)
        .then(res => res.json())
        .then((results) => {

            const { quote, character, anime } = results;

            const aboutEmbed = new Discord6.MessageEmbed()
            .setAuthor(`Quote from ${anime}:`, `https://chr1s.dev/assets/animelist.png`,`https://animechanapi.xyz/`)
            .setColor('#55128E')
            .setDescription(`${quote}\n **- ${character}**`)
            msg.channel.send(aboutEmbed)

        })
        .catch(handleError);

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid anime name! (//quote command does not include many anime)`);
            //console.error(error);
        }

        //msg.channel.send(`API Down for Maintenance!`);
        // const notifier = require(`node-notifier`);

        // notifier.notify({
        //     title: 'Anime Bible',
        //     message: 'Quote sent',
        //     icon: 'C:\\Users\\chris\\Pictures\\Chr1sDev\\chr1s.png'
        //   });

	
	// msg.channel.send("Quote command temporarily down");
	},
}
