module.exports = {
    name:"guilds",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        msg.channel.send(`Bot is in ${msg.client.guilds.cache.size} guilds!`);

    },
};