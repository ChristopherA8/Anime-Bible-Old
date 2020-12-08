module.exports = {
    name:"invite",
    execute(msg) {

        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/stats.sqlite');
        var stats = sql.prepare("SELECT * FROM stats").get();
        stats.invite++;
        stats.total++;
        sql.prepare("INSERT OR REPLACE INTO stats (total, anime, manga, character, help, about, invite, quote) VALUES (@total, @anime, @manga, @character, @help, @about, @invite, @quote);").run(stats);

        msg.channel.send(`Bot Invite Link:\n\<https://discord.com/oauth2/authorize?client_id=763464598959292458&scope=bot&permissions=515136\>`);

    },
};