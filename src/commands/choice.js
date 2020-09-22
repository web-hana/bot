const choice = (msg) => {
  if (msg.content.includes('방법') || msg.content.includes('어떻게')) { 
  msg.channel.send('보기들을 `\'선택 A B...\'`처럼 입력해주면 댕~!')    
  } else {
    if (msg.content.startsWith("선택")) {
      m = msg.content.split(' ')
      if (m[2] === undefined)
          msg.channel.send("보기들을 `\'선택 A B...\'`처럼 다시 입력해줘....")
      else{
        // 봇 지맴대러 한 개의 단어를 선택한다.
        result = Math.floor(Math.random() * (m.length-1)+1)
        // 단어 출력 !
        msg.channel.send("**"+m[result]+"** 어때?? :squid:")
      }
    }
  } 
}

module.exports = choice
