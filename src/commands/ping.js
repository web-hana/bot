const ping = (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
}

module.exports = ping
