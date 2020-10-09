const Discord6 = require('discord.js');
module.exports = {
    name: 'quote',
    description: '',
    execute(msg, args) {

        const fetch = require('node-fetch');

        var input = msg.content.substr(8);

        if (input === "") {
            var url = `https://animechanapi.xyz/api/quotes/random`;
        } else {
            var url = `https://animechanapi.xyz/api/quotes?anime=${input}`;
        }

        fetch(url)
        .then(res => res.json())
        .then((results) => {

            const { quote, character, anime } = results.data[0];

            const aboutEmbed = new Discord6.MessageEmbed()
            .setAuthor(`Quote from ${anime}:`, `https://chr1s.dev/assets/animelist.png`,`https://animechanapi.xyz/`)
            .setColor('#55128E')
            .setDescription(`${quote}\n **- ${character}**`)
            msg.channel.send(aboutEmbed)

        })
        .catch(handleError);

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid anime name! (//quote command does not include many anime)`);
            //console.error(error);
        }

    },
}