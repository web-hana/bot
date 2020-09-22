const { load, save } = require('../utils')

const messages = load('src/messages.json')

const set = async (msg, embed, _, school, searches) => {
  const text = msg.content
  const channel = msg.channel.id
  const searchData = searches[channel]
  if (!searchData) {
    embed.setDescription(messages.unregistered)
    return msg.channel.send(embed)
  }

  const data = load('data/school.json')
  const i = searchData[Number(text.replace(/[^{0-9}]/gi, '')) - 1]
  embed.setDescription(`${i.name}${i.type === 'KINDERGARTEN' ? '을' : '를'} 채널에 등록했어!`)
  msg.channel.send(embed)
  data[channel] = { type: i.type, region: i.region, schoolCode: i.schoolCode }
  save('data/school.json', data)
}

module.exports = set