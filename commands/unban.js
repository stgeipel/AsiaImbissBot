const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  try {
    let memberId = args[0]
    if (!memberId) throw 'Keine MemberID übergeben'

    message.guild.members
      .unban(memberId)
      .then((mem) => {
        message.channel.send(`Unbanned: ${mem}`)
      })
      .catch((err) => {
        message.channel.send('Error: ' + err.message)
      })
  } catch (e) {
    message.channel.send(e.message ?? e)
  }
}

module.exports.help = {
  name: 'unban',
  description: 'Entbannt den Member mit der ID = [memberID]',
  args: [
    {
      name: 'memberId',
      required: true,
    },
  ],
}
