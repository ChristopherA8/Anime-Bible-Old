module.exports = {
    name:"stats",
    execute(msg) {

        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats").get();

        const Discord50 = require('discord.js');
        var embed = new Discord50.MessageEmbed()
        .setTitle('Stats:')
        .setDescription(`Total: ${stats.total}\nAnime: ${stats.anime}\nManga: ${stats.manga}\nCharacter: ${stats.character}\nQuote: ${stats.quote}\nAbout: ${stats.about}\nHelp: ${stats.help}\nInvite: ${stats.invite}`);
        msg.channel.send(embed);

    },
};