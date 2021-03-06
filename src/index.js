const Discord = require('discord.js')
const client = new Discord.Client()

const School = require('school-kr')
const school = new School()

const { embed } = require('./utils')
const {
  help,
  mark,
  ping,
  fortune,
  meal,
  search,
  set,
  schedule,
  play,
  stop,
  translate,
  rsp,
  calculator,
  choice,
  covid,
  updown,
  baseball,
  check,
  dust,
  emergency
} = require('./commands')

const commands = {
  'help': help,
  '[\!\?]': mark,
  'ping': ping,
  '운세': fortune,
  '급식|조식|중식|석식|아침|점심|저녁': meal,
  '검색': search,
  '등록': set,
  '일정': schedule,
  'play': play,
  'stop': stop,
  '번역': translate,
  '안녕|동전|주사위|dice|제비뽑기': rsp,
  '계산': calculator,
  '선택': choice,
  '코로나': covid,
  '업다운': updown,
  '야구': baseball,
  '출석': check,
  '미세먼지': dust,
  '재난문자': emergency
}

const searches = {}
const number = {}
const cnt = {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.author.bot) return

  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      await command(msg, embed(msg), client, school, searches, number, cnt)
    }
  }
})

client.login(process.env.token)

