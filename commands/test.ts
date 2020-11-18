module.exports = {
    name:"test",
    execute(msg) {

        msg.channel.send(`Bot is in ${msg.client.guilds.cache.size} guilds!`);

    },
};