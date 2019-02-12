const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const Report = require("../models/mreport.js")

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!wUser) return message.reply("Couldn't find them yo");
  
  Report.find({userId: wUser.user.id}, function(err, reports){
    if(reports.length > 0){
      reports.forEach(r => {
        
      })
    }
  })
  
  if (warns[wUser.id].warns.length > 0) {
    warns[wUser.id].warns.forEach(e => {
      message.author.send(new Discord.RichEmbed(e));
    });
  }
  else {
    message.author.send(`<@${wUser.id}> hat keine Meldungen`);
  }
  //

}

module.exports.help = {
  name: "showreports",
  description: "Zeigt die hinterlegten Warnungen des Benutzers | showreports @Benutzer"
}