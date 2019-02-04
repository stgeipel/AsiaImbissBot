const Discord = require('discord.js');
const Embeds = require('../embed')
const fs = require('fs');
let rollenIcons = JSON.parse(fs.readFileSync('./configs/icons_to_role.json', 'utf8'))

/* 
Hier der Link zur Emojiliste
https://unicode.org/emoji/charts/full-emoji-list.html
*/



module.exports.run = async (bot, msg, args) => {

    
    if (args.length == 2) {
        const role = msg.guild.roles.find(x => args[0].includes(x));

        if (role != null) {
            rollenIcons[role.id] = args[1];
            fs.writeFile('./configs/icons_to_role.json', JSON.stringify(rollenIcons) ,(err) => {
                if(err) console.log(err);
            });
            
            Embeds.ok(msg.channel, `Icon wurde zu der Rolle ${role.name} hinzugefügt`, 'Vorgang anbgeschlossen')
        }
        else cmd_error(msg, 'Es ist ein Fehler aufgetreten')
    }
    else {
        cmd_error(msg, 'Es scheint etwas schief gelaufen zu sein');
    }
}

module.exports.help = {
    name: "AddIcon",
    description:"Fügt ein Icon zu einer Rolle hinzu. | iconrole @Serverrolle Icon"
}