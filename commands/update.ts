module.exports = {
    name:"update",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        msg.client.emit(`ready`);
        msg.channel.send(`Status updated!`);

    },
};