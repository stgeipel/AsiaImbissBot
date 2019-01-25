const Discord = require('discord.js');
const Embeds = require('../embed')
const fs = require('fs');
let admins = JSON.parse(fs.readFileSync('./configs/admin.json', 'utf8'))

module.exports.run = async (bot, msg, args) => {
    const user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if (user == null) Embeds.error(msg, 'Es konnte kein Bentzer mit diesem Namen gefunden werden')
    else {
        if (admins.find(x => x.id === user.id) != null) Embeds.info(msg, 'Benutzer ist schon ein Administrator');
        else {
            admins.push({ id: user.id, username: user.username });
            fs.writeFile('./configs/admin.json', JSON.stringify(admins), (err) => {
                if (err) console.log(err);
            });
        }
    }
}

module.exports.help = {
    name: "admin"
}
