module.exports = {
    name:"names",
    execute(msg) {

        //msg.client.guilds.cache.forEach(server => console.log(server.name))
        msg.client.guilds.cache.forEach(server => console.log(server.name));
        // console.log(name.name);

    },
};