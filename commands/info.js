require('dotenv').config()
const Discord = require('discord.js')

module.exports.run = async (bot, msg, args = []) => {
  try {
    let commands = require('../index').bot.commands.filter(
      (f) => (f.help.name == args[0]) | (args.length == 0)
    )

    let embededMsg = 'Error'
    if (commands.size == 0) {
      embededMsg = commandNotFound(args[0])
    } else if (commands.size == 1) {
      embededMsg = commandDesc(commands)
    } else {
      embededMsg = allCommands(msg, commands)
    }

    msg.channel.send(embededMsg)
  } catch (e) {
    msg.channel.send(e.message ?? e)
  }
}

function allCommands(msg, commands) {
  let embededMsg = new Discord.MessageEmbed()
    .setTitle('AsiaImbissBot')
    .setDescription(
      'Um weitere Informationen zum Befehl zu erfahren: \n $info [command] -> Bsp: `$info clear`'
    )
    .setColor('#15f153')
    .setThumbnail(msg.guild.iconURL())
    .setFooter('by Steffen and Pascal')

  commands.forEach((cmd) => {
    let name = cmd.help?.name?.length > 0 ? cmd.help?.name : 'No name'
    let desc = cmd.help?.description?.length > 0 ? cmd.help?.description : 'No description'
    embededMsg.addField(name, desc)
  })

  return embededMsg
}

function commandNotFound(name) {
  let embededMsg = new Discord.MessageEmbed()
    .setTitle(name)
    .setDescription('Diesen Befehl gibt es nicht ❌')
    .setColor('#FE0000')

  return embededMsg
}

function commandDesc(commands) {
  let cmd = commands.map((cmd) => cmd)[0]
  let name = cmd.help?.name?.length > 0 ? cmd.help?.name : 'No name'
  let desc = cmd.help?.description?.length > 0 ? cmd.help?.description : 'No description'
  let args = cmd.help?.args ?? []
  let examples = cmd.help?.examples ?? []

  let title = `${name} ${args.map((arg) => `[${arg.name}]`).join(' ')}`

  let exStr =
    examples.length > 0
      ? '\nBeispiel:\n' + examples.map((e) => `${process.env.prefix}${e}`).join('\n') + '\n'
      : ''

  let description = `${desc} \n ${exStr} \n ${args?.length > 0 ? '**Parameter:**' : ''}`

  let embededMsg = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor('#15f153')

  args.forEach((arg) => {
    let desc = `erforderlich: ${arg.required ? '✅' : '❌'} \n ${arg.description ?? ''}`
    embededMsg.addField(arg.name ?? '', desc)
  })
  return embededMsg
}

module.exports.help = {
  name: 'info',
  description: 'Zeigt alle Befehle',
  args: [{ name: 'command', required: false, description: 'Nähere Beschreibung des Befehls' }],
}
