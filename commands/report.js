const Discord = require('discord.js')
const fs = require('fs')
const ms = require('ms')
const Report = require('../models/mreport.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission('MANAGE_MEMBERS'))
    return message.reply('Keine Berechtigung dies zu tun')
  let wUser =
    message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  mongoose.connect('mongodb://localhost/soe', { useNewUrlParser: true })
  //if(!wUser) return message.reply("Couldn't find them yo");
  //if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(' ').slice(22)
  if (reason === '')
    return message
      .reply('Es wurde kein Grund angegben. Bitte geben Sie einen Grund an.')
      .then(msg => msg.delete(3000))

  const report = new Report({
    _id: mongoose.Types.ObjectId(),
    username: wUser.user.username,
    userId: wUser.user.id,
    reason: reason,
    rUsername: message.author.username,
    rUserId: message.author.id,
    time: message.createdAt,
    serverId: message.guild.id
  })
  let count = 0
  report
    .save()
    .then(async () => {
      count = await Report.countDocuments({ userId: wUser.user.id, serverId: message.guild.id })
      console.log(count)
    })
    .catch(err => console.log(err))

  //Output for Report Channel
  let warnEmbed = new Discord.RichEmbed()
    .setDescription('Meldung')
    .setAuthor(message.author.username)
    .setColor('#fc6400')
    .addField('Melung ausgesprochen gegen', `<@${wUser.id}>`)
    .addField('wurde gemeldet in', message.channel)
    .addField('Anzah der Meldungen', count)
    .addField('Grund', reason)

  let warnchannel = message.guild.channels.find(x => x.name == 'reports')
  if (!warnchannel && message.member.hasPermission('MANAGE_CHANNELS')) {
    message.channel
      .send('Es ist kein Report Channel vorhanden. Soll ich diesen für dich erstellen?')
      .then(async nm => {
        await nm.react('👍')
        await nm.react('👎')

        const filter = (reaction, user) => {
          return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id
        }

        nm.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
          .then(collected => {
            const reaction = collected.first()

            if (reaction.emoji.name === '👍') {
              message.guild.createChannel('reports', 'text').then(c => {
                // warnchannel = message.guild.channels.find(x => x.name == 'reports')
                c.send(warnEmbed)
              })
            }
          })
          .catch(collected => {
            console.log(`After a minute, only ${collected.size} out of 4 reacted.`)
            message.reply("you didn't react with neither a thumbs up, nor a thumbs down.")
          })
      })
  } else {
    warnchannel.send(warnEmbed)
  }
}

module.exports.help = {
  name: 'report',
  description: 'Meldet einen Benutzer | report @Benutzer Grund'
}
