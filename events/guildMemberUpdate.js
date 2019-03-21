const Discord = require("discord.js");
const Embeds = require("../embed");
const fs = require("fs");
let roles = JSON.parse(fs.readFileSync("./configs/icons_to_role.json", "utf8"));

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

    var rolesRemove = arr_diff(mold.roles.array(), mnew.roles.array());
    var rolesAdd = arr_diff(mnew.roles.array(), mold.roles.array());

    rolesAdd.forEach(ra => {
      if (ra.id in roles && !mnew.displayName.includes(roles[ra.id])) {
        mnew.setNickname(`${roles[ra.id]} ${mnew.displayName}`);
      }
    });

    rolesRemove.forEach(rr => {
      if (rr.id in roles && mnew.displayName.includes(roles[rr.id])) {
        mnew.setNickname(mnew.displayName.replace(roles[rr.id], ""));
      }
    });
  }
};
function arr_diff(a1, a2) {
  diff = [];

  a1.forEach(a => {
    if (a2.indexOf(a) == -1) diff.push(a);
  });

  return diff;
}
