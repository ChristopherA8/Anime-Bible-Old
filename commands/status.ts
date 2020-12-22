module.exports = {
    name:"status",
    execute(msg) {

        msg.client.user.setActivity(`Sorry if you got a "hi" message!!! I was testing global slash commands and somehow managed to send a hi to all the servers. Again, I am very sorry, that shouldn't happen again.`, {type: "PLAYING"})
        console.log('st')

    },
};