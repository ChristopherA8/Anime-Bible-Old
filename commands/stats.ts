module.exports = {
    name:"stats",
    execute(msg) {

        // Keep track of which commands are used the most
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();

        const Discord50 = require('discord.js');
        const embed = new Discord50.MessageEmbed()
        .setTitle('Stats:')
        .setDescription(`Total: ${stats.total}\nAnime: ${stats.anime}\nManga: ${stats.manga}\nCharacter: ${stats.character}\nQuote: ${stats.quote}\nAbout: ${stats.about}\nHelp: ${stats.help}\nInvite: ${stats.invite}\n/anime: ${stats.slashanime}\n/manga: ${stats.slashmanga}`);
        msg.channel.send(embed);

    },
};