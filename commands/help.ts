const Discord2 = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Lists all commands',
	execute(msg, args) {

        // Update SQLite database when someone uses the command
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
        stats.help++;
        stats.total++;
        sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);").run(stats);
        
        const exampleEmbed = new Discord2.MessageEmbed()
        .setColor('#55128E')
        .setTitle('Command List')
        .setFooter('')
        .setDescription('')
        .addFields(
            { name: '**1.** //anime <anime name>\n**2.** //manga <manga name>\n**3.** //quote [specify anime optional]\n**4.** //character <character name>\n**5.** //about\n**6.** //invite', value: "page 1/1"}
            // { name: '**1.** //anime <anime name>\n**2.** //manga <manga name>\n**3.** //character <character name>\n**4.** //about\n**5.** //invite', value: "page 1/1"}

        )
        //.setThumbnail(`https://chr1s.dev/assets/animelist.png`)
        msg.channel.send(exampleEmbed);
	},
};