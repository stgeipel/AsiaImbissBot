const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    try{

    
    let sicon = msg.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
   
    require('../index').bot.commands.forEach(cmd => {
        serverembed.addField(cmd.help.name, cmd.help.description)
    });

    msg.channel.send(serverembed);

    }
    catch(e)
    {
        msg.channel.send(e);
    }
}

module.exports.help = {
    name: "info",
    description:"Zeigt alle Befehle"
}
