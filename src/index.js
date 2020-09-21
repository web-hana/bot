const Discord = require('discord.js')
const client = new Discord.Client()

const { embed } = require('./utils')
const { help, mark, ping } = require('./commands')

const commands = {
  'help': help,
  '\!\?': mark,
  'ping': ping
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.author.bot) return

  for (const [regexp, command] of Object.entries(commands)) {
    if (msg.content.match(RegExp(regexp, 'i'))) {
      await command(msg, embed(msg), client)
      return
    }
  }
})

client.login(process.env.token)
