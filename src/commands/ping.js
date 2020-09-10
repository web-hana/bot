const ping = async (msg, embed, discord) => {
  embed.setTitle('Pong!')
    .addField('Discord Server', '측정중...')
    .addField('지연 시간', '측정중...')
  const before = await msg.channel.send(embed)
  embed.fields = []
  embed.addField('Discord Server', Math.round(discord.ws.ping) + 'ms')
    .addField('지연 시간', before.createdTimestamp - msg.createdTimestamp + 'ms')
  before.edit(embed)
}

module.exports = ping
