require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const Embeds = require('./embed')
const websocket = require('./WebSocket/websocket')
const gMemUpdate = require('./events/guildMemberUpdate')

var bot = new Discord.Client()
// var mongoose = require('mongoose')
// var ws = new websocket('123', 3000, bot)

bot.commands = new Discord.Collection()

let PREFIX = process.env.prefix ?? '$'

fs.readdir('./commands', (err, files) => {
  if (err) console.log(err)

  let jsfile = files.filter((f) => f.split('.').pop() === 'js')
  if (jsfile.length <= 0) {
    console.log('Befehle konnten nicht geladen werden')
    return
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    bot.commands.set(props.help.name, props)
  })
})

// Client thinks

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  // try {
  //   mongoose.connect("mongodb://localhost/" + bot.guil)
  // } catch (error) {
  //   console.log(error)
  // }
})

bot.on('message', async (msg) => {
  if (Embeds.checkRights(msg, process.env.owner)) {
    var cont = msg.content,
      author = msg.member,
      chan = msg.channel,
      guild = msg.guild

    if (msg.channel.type == 'text' && author.id != bot.user.id && cont.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = cont.trim().substring(PREFIX.length).split(/\s+/)

      let cmdfile = bot.commands.get(CMD_NAME)
      if (cmdfile) cmdfile.run(bot, msg, args)
    }
  }
})

bot.on('guildMemberUpdate', (mold, mnew) => {
  gMemUpdate.checkRolesAtUser(mold, mnew)
})

bot.login(process.env.token)

module.exports.bot = bot
// module.exports.mongoose = mongoose
