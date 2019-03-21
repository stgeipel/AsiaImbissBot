const Discord = require("discord.js");
const Embeds = require("../embed");
const mongoose = require("mongoose");
const Admin = require("../models/madmin");
//const fs = require('fs');
//let admins = JSON.parse(fs.readFileSync('./configs/admin.json', 'utf8'))

// module.exports.run = async (bot, msg, args) => {
//     const user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
//     if (user == null) Embeds.error(msg, 'Es konnte kein Bentzer mit diesem Namen gefunden werden')
//     else {
//         if (admins.find(x => x.id === user.id) != null) Embeds.info(msg, 'Benutzer ist schon ein Administrator');
//         else {
//             admins.push({ id: user.id, username: user.username });
//             fs.writeFile('./configs/admin.json', JSON.stringify(admins), (err) => {
//                 if (err) console.log(err);
//             });
//         }
//     }
// }

module.exports.run = async (bot, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return message.reply("Keine Berechtigung dies zu tun");
  mongoose.connect("mongodb://localhost/soe", { useNewUrlParser: true });
  const a = new Admin({
    _id: mongoose.Types.ObjectId(),
    clientid: msg.member.id,
    clientname: msg.member.user.username,
    serverid: msg.guild.id,
    servername: msg.guild.name
  });
  a.save();

  msg.reply("<@" + msg.member.id + "> wurde als Admin hinzugefügt");
};

module.exports.help = {
  name: "admin",
  description:
    "Fügt einen Benutzer zu den Administratoren hinzu | admin @Benutzer "
};
