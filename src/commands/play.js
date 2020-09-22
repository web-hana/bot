const ytdl = require('ytdl-core')

const play = async (msg) => {
    if(!msg.guild) return;

    const args = msg.content.split(" ")
    if(args[0] === 'play'){
        
        if(msg.member.voice.channel){
            const connection = await msg.member.voice.channel.join()

            try {
                const link = args[1]
                const myRe = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
                const url = link.match(myRe)
                if(url == null){
                    await msg.channel.send('url을 제대로 입력해주세요')
                    return
                }
            } catch (error) {
                await msg.channel.send('url을 입력해주세요')
                return
            }

            connection.play(ytdl(url[0], {filter: 'audioonly'}))
        }else{
            msg.channel.send('음성 채널에 참가해주세요!')
        }
    }
}

module.exports = play
  