const Discord2 = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Lists all commands',
	execute(msg, args) {
        
        const exampleEmbed = new Discord2.MessageEmbed()
        .setColor('#00FF86')
        .setTitle('Command List')
        .setFooter('')
        .setDescription('')
        .addFields(
            { name: '**1.** //anime <anime name>\n**2.** //manga <manga name>\n**3.** //quote [specify anime optional]\n**4.** //about', value: "page 1/1"}
        )
        .setThumbnail(`https://chr1s.dev/assets/animelist.png`)
        msg.channel.send(exampleEmbed);
	},
};