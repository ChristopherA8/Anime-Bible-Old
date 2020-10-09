const Discord6 = require('discord.js');
module.exports = {
    name: 'quotes',
    description: '',
    execute(msg, args) {

        var input = msg.content.substr(9).trim();


        var url1 = `https://animechanapi.xyz/api/quotes?anime=${input}`;
        var url2 = `https://animechanapi.xyz/api/quotes/random`;

        if (input == undefined) {
            var url = url2;
        } else {
            var url = url1;
        }

        fetch(url).then(handleResponse)
        .then(handleData)
        .catch(handleError);

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(results) {

            const aboutEmbed = new Discord6.MessageEmbed()
            .setAuthor(`Quote from ${results.data.anime}:`, `https://chr1s.dev/assets/animelist.png`,`https://animechanapi.xyz/`)
            .setColor('#02f2ce')
            .setDescription(`${results.data.quote}\n **- ${results.character}**`)
            .setThumbnail(`https://chr1s.dev/assets/animelist.png`)
            msg.channel.send(aboutEmbed)

        }

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid anime name!`);
            //console.error(error);
        }




    },
}