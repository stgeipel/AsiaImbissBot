const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  try {
    let memberId = args[0]
    if (!memberId) throw 'Keine MemberID übergeben'

    message.guild.members
      .ban(memberId)
      .then((mem) => {
        message.channel.send(`${mem} was banned!`)
      })
      .catch((err) => {
        message.channel.send('Error: ' + err.message)
      })
  } catch (e) {
    message.channel.send(e.message ?? e)
  }
}

module.exports.help = {
  name: 'ban',
  description: 'Bannt den Member mit der ID = [memberID]',
  args: [
    {
      name: 'memberId',
      required: true,
    },
  ],
}
