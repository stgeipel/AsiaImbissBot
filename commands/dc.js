const Discord = require('discord.js')
const { reactionMessage } = require('../functions')

module.exports.run = async (bot, message, args) => {
  try {
    let type = args[0]
    let id = args[1]

    switch (type) {
      case 'member': {
        disconnectMember(message.channel, id)
        break
      }
      case 'vote': {
        await disconnectVote(message, id)
        break
      }
      default:
        throw 'Ungültiger Typ! Erlaubt: `member`. `vote`'
    }
  } catch (e) {
    message.channel.send(e.message ?? e)
  }
}

function disconnectMember(channel, memberId) {
  let channelMember = channel.members.find((m) => m.user.id == memberId)
  if (!channelMember) throw `Kein Member mit der ID ${memberId} im Channel ${channel.name} gefunden`

  channelMember.voice.kick()
  throw `${channelMember.user} wurde disconnected`
}

async function disconnectVote(message, channelId) {
  if (!channelId) throw 'Keine ChannelID übergeben'

  let members = getVoiceChannelMembers(message, channelId)
  if (members.length == 0) throw 'Keine Member gefunden'

  let time = 10
  let reactMsg = await reactionMessage(message.channel, getMessage(time), ['✅', '❌'])

  while (time > 1) {
    await sleep(1000)
    reactMsg.edit(getMessage(--time))
  }
  reactMsg.delete()

  let reactions = reactMsg.reactions.cache.map((r) => {
    return { name: r._emoji.name, count: r.count }
  })

  if (reactions[0].count > reactions[1].count) {
    let randomMember = members[Math.floor(Math.random() * members.length)]
    randomMember.voice.kick()
    sendMessage(`${randomMember} wurde disconected`, message.channel)
  } else if (reactions[0].count < reactions[1].count) {
    sendMessage('Es wurde für ❌ abgestimmt! Es wird keiner disconnected', message.channel)
  } else {
    sendMessage('Unentschieden! Es passiert nichts', message.channel)
  }
}

function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), s)
  })
}

function getMessage(time) {
  return new Discord.MessageEmbed()
    .setTitle('Random disconnect')
    .setDescription('Bitte abstimmen!')
    .setColor('#15f153')
    .addField('Zeit', time)
}

function getVoiceChannelMembers(msg, channelId) {
  let members = []
  msg.guild.channels.cache.forEach((ch) => {
    // wenn channelId nicht übergeben wurde nimmt er alle aus allen Voicechats
    if (ch.id == channelId || channelId == null) {
      if (ch.type == 'voice') {
        if (ch.permissionsFor(msg.author).has('VIEW_CHANNEL')) {
          ch.members.map((m) => members.push(m))
        }
      }
    }
  })
  // Keine Bots kicken!
  return members.filter((f) => !f.user.bot)
}

function sendMessage(txt, channel) {
  channel.send(txt).then((msg) => msg.delete({ timeout: 2000 }))
}

module.exports.help = {
  name: 'dc',
  description:
    'Disconnected entweder einen Member aus dem Voice-Channel oder per vote einen zufälligen Member',
  args: [
    {
      name: 'type',
      required: true,
      description: 'Entweder `member` oder `vote`',
    },
    {
      name: 'ID',
      required: true,
      description: 'Bei Typ `member` = memberID \n Bei Typ `vote` = channelID',
    },
  ],
  examples: ['dc member 6581657987416507921', 'dc vote 980732365307614262'],
}
