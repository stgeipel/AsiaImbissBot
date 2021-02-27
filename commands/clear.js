const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  try {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) throw 'Keine Rechte!'
    if (!args[0]) throw 'Keine Anzahl übergeben'
    let number = args[0]
    if (number > 100 || number < 1) throw 'Ungültige Anzahl. Erlaubt: 1-100'
    message.channel.bulkDelete(number, true).then(() => {
      message.channel
        .send(`Cleared \`${number}\` messages.`)
        .then((msg) => msg.delete({ timeout: 2000 }))
    })
  } catch (error) {
    message.channel.send(error)
  }
}

module.exports.help = {
  name: 'clear',
  description: 'Bulkdelete der letzten Einträge die nicht älter sind als 14 Tage',
  args: [
    {
      name: 'count',
      required: true,
      description: 'Anzahl der zu löschenden Nachrichten. Die Anzahl muss zwischen 1-100 liegen',
    },
  ],
}
