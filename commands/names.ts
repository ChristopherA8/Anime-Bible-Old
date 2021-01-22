module.exports = {
    name:"names",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        var names = [];
        var cool = msg.client.guilds.cache.filter(guilds => guilds.premiumTier == 1);
        // msg.client.guilds.cache.forEach(server => names.push(server.name));
        cool.forEach(server => names.push(server.name));

        const fs = require('fs');

        fs.writeFileSync(`./level_one.json`, JSON.stringify(names, null, 4));

    },
};