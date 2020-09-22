const axios = require('axios')

const dust = (msg, embed) => {
    axios.get('http://openapi.airkorea.or.kr/openapi/services/rest/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo', {
        params: {
            serviceKey: 'kdtuyufwaKngOS/2HRaL+hRTaO6qjmS1nKvgsyEWoYe4BKvPuZq9w9HDVpFnE8yiZaYFXXdsr/yDrOGnODnlHQ==',
            year: new Date().getFullYear(),
            _returnType: 'json'
        }
    }).then((res) => {
        console.log(res.data)
        const dustData = res.data.list
        
        embed.setTitle(`최근 미세먼지 경보 발령`)

        for (let i = 0; i < 3; i++) {
            embed.addFields(
                { name: '날짜', value: `${dustData[i].issueDate} / ${dustData[i].issueTime} ~ ${dustData[i].clearDate} / ${dustData[i].clearTime}`},
                { name: '지역', value: `${dustData[i].districtName}시 ${dustData[i].moveName}`, inline: true },
                { name: '발령농도', value: `${dustData[i].issueVal}㎍/m³, 미세먼지 ${dustData[i].issueGbn}\n`, inline: true },
                { name: '\u200B', value: '\u200B' },
            )
        }
        msg.channel.send(embed)
    })
    
}

module.exports = dust