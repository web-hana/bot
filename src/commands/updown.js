const updown = async (msg, embed, _, __, ___, number, cnt) => {
    const args = msg.content.split(" ")
    const channel = msg.channel.id

    if(args[1] === '시작'){
        embed.setTitle('게임 시작')
        msg.channel.send(embed)
        const jbRandom = Math.random()
        number[channel] = Math.floor( jbRandom * 100 )
        cnt[channel] = 0
         console.log(number[channel])
    }else if(args[1] === '종료'){
        embed.setTitle('게임 종료')
        msg.channel.send(embed)
        number[channel] = null
    }
    else{
        if(number[channel] == null || number[channel] == undefined){
            msg.channel.send('게임을 시작하세요')
        }else{
            const input_number = args[1]
            if(input_number > number[channel]) {
                embed.setTitle('다운')
                msg.channel.send(embed)
                cnt[channel]++
            }
            else if(input_number < number[channel]) {
                embed.setTitle('업')
                msg.channel.send(embed)
                cnt[channel]++
            }
            else if(input_number == number[channel]) {
                cnt[channel]++
                embed.setTitle(cnt[channel]+'번 만에 맞췄어~~ 축하해')
                msg.channel.send(embed)
                number[channel] = null
            }
            else msg.channel.send('숫자를 입력하세요')
        }
    }
}

module.exports = updown