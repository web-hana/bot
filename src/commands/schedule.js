const School = require('school-kr')
const { load } = require('../utils') 

const messages = load('src/messages.json')

const schedule = async (msg, embed, _, school) => {
  const text = msg.content
  const channel = msg.channel.id
  const data = load(`data/school.json`)[channel]
  if (!data) {
    embed.setDescription(messages.unregistered)
    return msg.channel.send(embed)
  }

  school.init(School.Type[data.type], School.Region[data.region], data.schoolCode)
  const calendar = await school.getCalendar({ default: null })
  embed.setTitle(`${calendar.year}년 ${calendar.month}월\n`)

  calendar.year = undefined
  calendar.month = undefined
  calendar.day = undefined
  calendar.today = undefined

  for (const day in calendar) {
    if (calendar[day]) {
      embed.addField(day + '일', calendar[day].replace(/,/g, '\n'))
    }
  }
  msg.channel.send(embed)
}

module.exports = schedule