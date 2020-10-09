const Discord1 = require('discord.js');
module.exports = {
    name: 'about',
    description: '',
    execute(msg, args) {

        const aboutEmbed = new Discord1.MessageEmbed()
        .setTitle(`About Anime List`)
        .setURL(`https://chr1s.dev`)
        .setAuthor("About!", "https://cdn.discordapp.com/avatars/279032930926592000/a_cc4019bacee94c215fab2240987f4897.webp","https://chr1s.dev")
        .setColor('#55128E')
        .setDescription(`\**Anime List\** is a discord bot for the AniList API. It's main purpose is as an anime library.`)
        .setFooter(`Developer: Chr1s`, `https://chr1s.dev/assets/verified_dev.png`)
        //.setThumbnail(`https://chr1s.dev/assets/animelist.png`)
        msg.channel.send(aboutEmbed)

    },
}