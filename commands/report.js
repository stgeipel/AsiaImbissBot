const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const Report = require("../models/mreport.js");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.reply("Keine Berechtigung dies zu tun");
  let wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  mongoose.connect("mongodb://localhost/soe", { useNewUrlParser: true });
  //if(!wUser) return message.reply("Couldn't find them yo");
  //if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);
  if (reason === "")
    return message
      .reply("Es wurde kein Grund angegben. Bitte geben Sie einen Grund an.")
      .then(msg => msg.delete(3000));
  // if(!warns[wUser.id]) warns[wUser.id] = {
  //   warns: []
  // };

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: wUser.user.username,
    userId: wUser.user.id,
    reason: reason,
    rUsername: message.author.username,
    rUserId: message.author.id,
    time: message.createdAt,
    serverId: message.guild.id
  });

  let count = 0;

  report
    .save()
    .then(r => {
      Report.countDocuments(
        { userId: wUser.user.id, serverId: message.guild.id },
        function(e, c) {
          count = c;
        }
      );
    })
    .catch(err => console.log(err));

  let warnEmbed = new Discord.RichEmbed()
    .setDescription("Meldung")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Melung ausgesprochen gegen", `<@${wUser.id}>`)
    .addField("wurde gemeldet in", message.channel)
    .addField("Anzah der Meldungen", count)
    .addField("Grund", reason);

  // warns[wUser.id].warns.push(warnEmbed);

  // fs.writeFile("./configs/warnings.json", JSON.stringify(warns), (err) => {
  //   if (err) console.log(err)
  // });

  let warnchannel = message.guild.channels.find(x => x.name == "Reports");

  if (!warnchannel) {
    message.channel
      .send(
        "Es ist kein Report Channel vorhanden. Soll ich diesen für dich erstellen?"
      )
      .then(nm => {
        nm.react("👍");
        nm.react("👎");

        // Create a reaction collector
        const filter = (reaction, user) =>
          reaction.emoji.name === "👌" && user.id === "someID";
        const collector = message.createReactionCollector(filter, {
          time: 15000
        });
        collector.on("collect", r => console.log(`Collected ${r.emoji.name}`));
        collector.on("end", collected =>
          console.log(`Collected ${collected.size} items`)
        );
      });
  } else {
    warnchannel.send(warnEmbed);
  }

  // if(warns[wUser.id].warns == 2){
  //   let muterole = message.guild.roles.find(`name`, "muted");
  //   if(!muterole) return message.reply("You should create that role dude.");

  //   let mutetime = "10s";
  //   await(wUser.addRole(muterole.id));
  //   message.channel.send(`<@${wUser.id}> has been temporarily muted`);

  //   setTimeout(function(){
  //     wUser.removeRole(muterole.id)
  //     message.reply(`<@${wUser.id}> has been unmuted.`)
  //   }, ms(mutetime))
  // }
  // if(warns[wUser.id].warns == 3){
  //   message.guild.member(wUser).ban(reason);
  //   message.reply(`<@${wUser.id}> has been banned.`)
  // }
};

module.exports.help = {
  name: "report",
  description: "Meldet einen Benutzer | report @Benutzer Grund"
};
