const Discord = require('discord.js');
const Embeds = require('../embed')
const fs = require('fs');
let roles = JSON.parse(fs.readFileSync('./configs/icons_to_role.json', 'utf8'))

module.exports = {

    checkRolesAtUser(mold, mnew) {
        // if (mold.roles.array().length < mnew.roles.array().length) {
        //     var role = mnew.roles.find(r => mold.roles.find(r2 => r2.id == r.id) == null)
        //     if (role.id in roles)
        //         mnew.setNickname(`${roles[role.id]} ${mnew.displayName}`)
        // }
        // else if (mold.roles.array().length > mnew.roles.array().length) {
        //     var role = mold.roles.find(r => mnew.roles.find(r2 => r2.id == r.id) == null)
        //     if (role.id in roles)
        //         mnew.setNickname(mnew.displayName.substr(roles[role.id].length + 1))
        // }
        // else if(mold.user.username != mnew.user.username){
            
        // }

        mnew.roles.array.forEach(e => {
            if(e.id in roles) mnew.setNickname(`${roles[role.id]} ${mnew.displayName}`)

        });
    }
}

