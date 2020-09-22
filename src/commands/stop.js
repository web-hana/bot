const ytdl = require('ytdl-core')

const stop = async (msg, embed, discord) => {
    try {
        msg.member.voice.channel.leave()
    } catch (error) {
        msg.channel.send('음성 채널에 참가하지 않았습니다')
    }
}

module.exports = stop
  