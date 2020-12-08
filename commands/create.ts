module.exports = {
    name:"create",
    execute(msg) {

        const SQLite = require('better-sqlite3');

    // Create SQLite database
    const sql = new SQLite('./databases/stats.sqlite');

        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE stats (total INTEGER, anime INTEGER, manga INTEGER, character INTEGER, help INTEGER, about INTEGER, invite INTEGER, quote INTEGER, stay INTEGER PRIMARY KEY);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

    },
};