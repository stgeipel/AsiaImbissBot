const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("No.");
    if (!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel
        .send(`Clear ${args[0]} messages.`)
        .then(msg => msg.delete(2000));
    });
  } catch (error) {
    message.channel.send(error);
  }
};

module.exports.help = {
  name: "clear",
  description:
    "Bulkdelete der letzten Einträge die nicht älter sind als 14 Tage"
};
