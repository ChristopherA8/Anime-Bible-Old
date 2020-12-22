module.exports = {
    name:"invite",
    execute(msg) {

        // Update SQLite database when someone uses the command
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats WHERE stay = 1").get();
        stats.invite++;
        stats.total++;
        sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote, stay, slashanime, slashmanga) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote, @stay, @slashanime, @slashmanga);").run(stats);

        msg.channel.send(`Bot Invite Link:\n\<https://discord.com/api/oauth2/authorize?client_id=763464598959292458&permissions=3072&scope=applications.commands%20bot\>`);

    },
};