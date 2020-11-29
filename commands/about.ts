const Discord1 = require('discord.js');
module.exports = {
    name: 'about',
    description: '',
    execute(msg, args) {

        const aboutEmbed = new Discord1.MessageEmbed()
        .setTitle(`About Anime Bible`)
        .setURL(`https://chr1s.dev/anime`)
        .setAuthor("About!", "https://chr1s.dev/assets/animelist.png","https://chr1s.dev/anime")
        .setColor('#55128E')
        .setDescription(`Lets the user search for various anime, manga, characters and quotes from the extensive selection at AniList.co. Uses the AniList.co GraphQL API to fetch images, titles, ratings, episode count, etc... If you like this bot, consider supporting me over on patreon! https://www.patreon.com/chr1sdev`)
        .setFooter(`Developer: Chr1s (christopher#8888)`, `https://chr1s.dev/assets/verified_dev.png`)
        //.setThumbnail(`https://chr1s.dev/assets/animelist.png`)
        msg.channel.send(aboutEmbed)

    },
}