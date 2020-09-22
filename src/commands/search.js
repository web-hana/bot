const School = require('school-kr')
const { load } = require('../utils')

const define = load('src/define.json')

const search = async (msg, embed, _, school, searches) => {
  const text = msg.content
  const channel = msg.channel.id
  if (!text.match(/.*(초|중|고|학교|유치원)/)) {
    embed.setDescription('학교나 유치원 이름을 정확하게 입력해줘!')
    return msg.channel.send(embed)
  }

  let result = []
  for (const region in School.Region) {
    const splitText = text.match(/.*(초|중|고|학교|유치원)/)[0].split(' ')
    const searchResult = await school.search(School.Region[region], splitText[splitText.length - 1])
    searchResult.forEach(e => {
      let addr, type = 'HIGH'
      for (const [key, value] of Object.entries(define.region)) {
        if (region === key) addr = value
      }
      for (const [key, value] of Object.entries(define.schoolExp)) {
        if (e.name.match(key)) type = value
      }
      result.push({ name: e.name, type: type, schoolCode: e.schoolCode, region: region, schoolRegion: addr, address: e.address })
    })
  }
  for (const key in result) {
    embed.addField(`${Number(key) + 1}. ${result[key].name}`, result[key].address !== ' ' ? result[key].address : result[key].schoolRegion ? result[key].schoolRegion + '교육청 소재' : '소재지 정보 없음')
    searches[channel] = result
  }
  embed.setDescription('\'구름아 1번 등록해줘\'처럼 말해주면 채널에 등록해줄게')
  msg.channel.send(embed)
}

module.exports = search