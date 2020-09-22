const School = require('school-kr')
const { dateConvert, load } = require('../utils')

const messages = load('src/messages.json')
const define = load('src/define.json')

const mealConvert = async (date, type, embed, school) => {
  let meal = await school.getMeal({ year: date.getFullYear(), month: date.getMonth() + 1 })

  let rebase = meal[date.getDate()].replace(/[0-9*.]|amp;|\//gi, '')

  if (rebase.includes(`[${type}]`)) {
    const length = rebase.indexOf(`[${type}]`)
    const sub = rebase.substring(length, rebase.indexOf('[', length + 1) !== -1 ? rebase.indexOf('[', length + 1) : rebase.length)
    embed.addField(type, sub.replace(/\[\S*?\]/g, ''), false)
  } else if (type === '급식') {
    ['조식', '중식', '석식'].forEach(e => {
      const length = rebase.indexOf(`[${e}]`)
      const sub = rebase.substring(length, rebase.indexOf('[', length + 1) !== -1 ? rebase.indexOf('[', length + 1) : rebase.length)
      if (sub) {
        embed.addField(e, sub.replace(/\[\S*?\]/g, ''), true)
      }
    })
  }

  if (!embed.fields.length) {
    embed.setDescription(type + '이 없습니다')
  }

  return
}

const meal = async (msg, embed, _, school) => {
  const text = msg.content
  const channel = msg.channel.id
  const data = load(`data/school.json`)[channel]
  if (!data) {
    embed.setDescription(messages.unregistered)
    return msg.channel.send(embed)
  }

  const date = dateConvert(text)
  school.init(School.Type[data.type], School.Region[data.region], data.schoolCode)
  embed.setTitle(`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${define.week[date.getDay()]})\n`)
  await mealConvert(date, text.match(/(아침|조식)/) ? '조식' : text.match(/(점심|중식)/) ? '중식' : text.match(/(저녁|석식)/) ? '석식' : '급식', embed, school)
  msg.channel.send(embed)
}

module.exports = meal