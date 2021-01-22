module.exports = {
    name:"test",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        // msg.client.guilds.cache.sort((guildA, guildB) => guildA.memberCount - guildB.memberCount).forEach(guild => { guild.channels.cache.filter(channel => channel.type !== `category`).first().createInvite({ unique: true }).then(inv => msg.reply(JSON.stringify(inv))) });
        const Discord = require('discord.js');

        var count = 1;

        var top = msg.client.guilds.cache.sort((guildA, guildB) => guildB.memberCount - guildA.memberCount).forEach(guild => {
            if (count > 5) return;
            var info = {
                Name: guild.name,
                Members: guild.memberCount,
    
            }
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Top Member Count Guild:`)
            .setColor('#FF0000')
            .setThumbnail(guild.iconURL());
            for (const thing in info) {
                if (Object.prototype.hasOwnProperty.call(info, thing)) {
                    const element = info[thing];
                    embed.addField(thing, element, true);
                }
            }
            msg.reply(embed);
            
            count++;
        });


    },
};