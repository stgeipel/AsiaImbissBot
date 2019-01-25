const { RichEmbed } = require('discord.js')
const fs = require('fs');
const admins = JSON.parse(fs.readFileSync('./configs/admin.json', 'utf8'))

const COLORS = {
    red: 0xe74c3c,
    green: 0x2ecc71,
    blue: 0x0000FF
}

exports.test = "test"

module.exports = {

    /**
     * Send an error embed message into a channel
     * @param {Discord.Channel} chan Channel where mesage is send to
     * @param {string} cont 
     * @param {string} title 
     */
    error(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.red)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        })
        return message
    },

    info(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.blue)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        })
    },

    ok(chan, cont, title) {
        var message
        var emb = new RichEmbed()
            .setColor(COLORS.green)
            .setDescription(cont)
        if (title) {
            emb.setTitle(title)
        }
        chan.send('', emb).then((m) => {
            message = m
        })
    },
    checkRights(msg, owner) {
        return (owner == msg.member.id || admins.find(x => x.id == msg.member.id) != null)
    }

}