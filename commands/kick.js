const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  try {
    let memberId = args[0]
    if (!memberId) throw 'Keine MemberID übergeben'

    let member = message.guild.members.cache.get(memberId)
    if (!member) throw `Kein Member mit der ID *${memberId}* gefunden!`

    member
      .kick()
      .then((mem) => {
        message.channel.send(`${mem} wurde gekickt!`)
      })
      .catch((err) => {
        message.channel.send('Error: ' + err.message)
      })
  } catch (e) {
    message.channel.send(e.message ?? e)
  }
}

module.exports.help = {
  name: 'kick',
  description: 'Kickt den Member mit der ID = [memberID]',
  args: [
    {
      name: 'memberId',
      required: true,
    },
  ],
}
