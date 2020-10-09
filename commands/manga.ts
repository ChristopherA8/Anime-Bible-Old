const Discord4 = require('discord.js');

module.exports = {
    name: 'manga',
    description: '',
    execute(msg) {

        const fetch = require('node-fetch');



        // Define our query variables and values that will be used in the query request
        var vars = {
            search: `${msg.content.substr(9)}`,
        };

        // Here we define our query as a multi-line string
        var query = `
        {
            Media(search: "${vars.search}", type: MANGA) {
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                romaji
                english
                native
                userPreferred
              }
              description(asHtml: false)
              episodes
              averageScore
            }
          }
        `;

        // Define the config we'll need for our Api request
        var url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: vars
                })
            };

        // Make the HTTP Api request
        fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }

        function handleData(results) {

            //var desc = results.data.Media.description.substring(0,100);

            const aboutEmbed = new Discord4.MessageEmbed()
            //.setTitle(`About Anime List`)
            //.setURL(`https://chr1s.dev`)
            .setAuthor(`${results.data.Media.title.romaji} (${results.data.Media.title.native})`, `https://anilist.co/img/icons/favicon-32x32.png`,`https://anilist.co`)
            .setColor('#55128E')
            .setDescription(`${results.data.Media.description.substring(0,250)}...`)
            .setFooter(`Total Episodes: ${results.data.Media.episodes}   |   Average Score: ${results.data.Media.averageScore}/100`, `https://chr1s.dev/assets/animelist.png`)
            .setThumbnail(`${results.data.Media.coverImage.extraLarge}`)
            msg.channel.send(aboutEmbed)

        }

        function handleError(error) {
            msg.channel.send(`\**Error:\** Invalid manga name!`);
            //console.error(error);
        }
    ////////
    },
}