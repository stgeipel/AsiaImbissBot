const Discord = require('discord.js')

async function reactionMessage(channel, text, reactions = []) {
  return await channel.send(text).then((msg) => {
    if (reactions.length > 0) addReactions(msg, reactions)
    return msg
  })
}

function addReactions(msg, reactions) {
  msg.react(reactions[0])
  reactions.shift()
  if (reactions.length > 0) {
    setTimeout(() => addReactions(msg, reactions), 250)
  }
}

module.exports = {
  reactionMessage,
}
