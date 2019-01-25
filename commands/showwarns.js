const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./configs/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (!wUser) return message.reply("Couldn't find them yo");
  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: []
  };
  
  if (warns[wUser.id].warns.length > 0) {
    warns[wUser.id].warns.forEach(e => {
      message.author.send(new Discord.RichEmbed(e));
    });
  }
  else {
    message.author.send(`<@${wUser.id}> hat keine Warnungen`);
  }
  //

}

module.exports.help = {
  name: "showwarns"
}