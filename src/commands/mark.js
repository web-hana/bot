const mark = (msg) => {
  if (Math.random() > 0.3) return
 
  if (msg.content.includes('!?')) msg.channel.send('!?')
  else if (msg.content.includes('?!')) msg.channel.send('?!')
  else if (msg.content.includes('!')) msg.channel.send('!')
  else if (msg.content.includes('?')) msg.channel.send('?')
}

module.exports = mark
