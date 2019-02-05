const Discord = require("discord.js");
const fs = require("fs");
const Embeds = require("./embed");
const gMemUpdate = require("./events/guildMemberUpdate");

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Befehle konnten nicht geladen werden");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

// Client thinks

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async msg => {
  if (Embeds.checkRights(msg, config.owner)) {
    var cont = msg.content,
      author = msg.member,
      chan = msg.channel,
      guild = msg.guild;

    if (
      msg.channel.type == "text" &&
      author.id != bot.user.id &&
      cont.startsWith(config.prefix)
    ) {
      var invoke = cont
          .split(" ")[0]
          .substr(config.prefix.length)
          .toLowerCase(),
        args = cont.split(" ").slice(1);

      // if (args.length == 0) Embeds.error(msg, 'Es wurde keine Argumente zu diesem Befehl angegeben')
      args = args.filter(x => x !== "");
      let cmdfile = bot.commands.get(invoke);
      if (cmdfile) cmdfile.run(bot, msg, args);
    }
  }
});

bot.on("guildMemberUpdate", (mold, mnew) => {
  gMemUpdate.checkRolesAtUser(mold, mnew);
});

bot.login(config.token);

module.exports.bot = bot;

function test() {
  console.log("test");
  console.log("test");
}
