module.exports = {
    name:"names",
    execute(msg) {

        var names = [];
        // var cool = msg.client.guilds.cache.filter(guilds => guilds.premiumTier == 2);
        msg.client.guilds.cache.forEach(server => names.push(server.name));
        // cool.forEach(server => names.push(server.name));

        const fs = require('fs');

        fs.writeFileSync(`./guilds.json`, JSON.stringify(names, null, 4));

    },
};