const { save, load } = require('../utils')

cookie = [
  "인간의 삶 전체는 단지 한 순간에 불과합니다. 인생을 즐깁시다.",
  "진정으로 나 자신이 아닌 것은 과감하게 버려야 할 필요가 있습니다.",
  "내가 가진 것을 지키면 물건이지만 나누어주면 행복이 됩니다.",
  "고지를 눈앞에 두고 있습니다. 힘을 내세요.",
  "당신이 기대주기를 바라는 타인이 있습니다. 솔직해져 보세요.",
  "춤을 추고 싶을 때는 춤을 춰요 할아버지 할머니도 춤을 춰요",
  "뒤돌면 후회 뿐입니다. 무조건 직진하세요.",
  "지속적인 무리는 마음을 조급하게 만들고 나아가는 것을 지치게 합니다.",
  "기분이 저기압일 땐 고기앞으로",
  "자주성을 잃은 삶은 필연적으로 불행해지게 됩니다.",
  "삶의 방향성을 잃어버리지 않았는지 되짚어보세요.",
  "실패가 겹쳐도 당신은 당신입니다.",
  "매월 말 조금씩 저금을 해 보면, 연말에 얼마나 많은 금액이 모였는지 알고 놀라게 될 것입니다.",
  "열망이 능력을 가져옵니다.",
  "세상은 고난으로 가득하지만, 고난의 극복으로도 가득합니다.",
]

const fortune = (msg) => {
  const data = load('data/fortune.json')
  msg.channel.send('오늘의 운세는~~~~')
  result = Math.floor(Math.random() * cookie.length + 1)

  const date = new Date()
  const today = date.getFullYear().toString() + (date.getMonth() + 1) + date.getDate()

  if (data[msg.author.id] != null) {
    if (data[msg.author.id].date == today) {
      msg.reply(data[msg.author.id].cookie)
    } else {
      data[msg.author.id] = {
        cookie: cookie[result],
        date: today,
      }
      msg.reply(data[msg.author.id].cookie)
      save('data/fortune.json', data)
    }
  } else {
    data[msg.author.id] = {
      cookie: cookie[result],
      date: today,
    }
    msg.reply(data[msg.author.id].cookie)
    save('data/fortune.json', data)
  }
}

module.exports = fortune
