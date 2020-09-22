const axios = require('axios')

const covid = (msg, embed) => {
    axios.get('http://apis.data.go.kr/1741000/DisasterMsg2/getDisasterMsgList', {
        params: {
            serviceKey: 'kdtuyufwaKngOS/2HRaL+hRTaO6qjmS1nKvgsyEWoYe4BKvPuZq9w9HDVpFnE8yiZaYFXXdsr/yDrOGnODnlHQ==',
            type: 'json'
        }
    }).then((res) => {
        const EmergenData = res.data.DisasterMsg[1].row
        embed.setTitle(`재난문자`)
        for (let i = 0; i < 5; i++) {
            embed.addFields({ name: `${EmergenData[i].location_name}`, value: `${EmergenData[i].msg}` })
        }
        msg.channel.send(embed)
    })

}

module.exports = covid