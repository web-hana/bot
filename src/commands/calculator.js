const calculator = (msg) => {
  m = msg.content.split(' ')

  if (msg.content.includes('방법') || msg.content.includes('어떻게')) { 
    msg.channel.send('계산하고 싶은 식을 `\계산 A+B\`처럼 공백없이 입력해주면 댕~!')    
    }else{ 
      if (m[1] === undefined)
      msg.channel.send("계산하고 싶은 식을 `\계산 A+B\`처럼 공백없이 ....다시 입력해줘.....")
      else{
        msg.channel.send(eval(m[1]))
      }
    }
}


module.exports = calculator
