module.exports = {
    name:"update",
    execute(msg) {

        msg.client.emit(`ready`);
        msg.channel.send(`Status updated!`);

    },
};