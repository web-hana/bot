const axios = require('axios')

const covid = (msg, embed) => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    axios.get('http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson', {
        params: {
            serviceKey: 'kdtuyufwaKngOS/2HRaL+hRTaO6qjmS1nKvgsyEWoYe4BKvPuZq9w9HDVpFnE8yiZaYFXXdsr/yDrOGnODnlHQ==',
            startCreateDt: date.getFullYear().toString() + ( date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + date.getDate(),
        }
    }).then((res) => {
        const covidData = res.data.response.body.items.item
        const examCnt = covidData[0].examCnt - covidData[1].examCnt
        const careCnt = covidData[0].careCnt - covidData[1].careCnt
        const deathCnt = covidData[0].deathCnt - covidData[1].deathCnt
        const decideCnt = covidData[0].decideCnt - covidData[1].decideCnt
        embed
        .setTitle(`${covidData[0].stateDt} 기준 코로나 감염자`)
        .addFields(
            { name: '검사진행 수', value: `${covidData[0].examCnt} (${examCnt > -1 ? '+' + examCnt : examCnt})`, inline: true },
            { name: '치료 환자 수', value: `${covidData[0].careCnt} (${careCnt > -1 ? '+' + careCnt : careCnt})`, inline: true },
            { name: '사망자 수', value: `${covidData[0].deathCnt} (${deathCnt > -1 ? '+' + deathCnt : deathCnt})`, inline: true },
            { name: '확진자 수', value: `${covidData[0].decideCnt} (${decideCnt > -1 ? '+' + decideCnt : decideCnt})`, inline: true },
        )
        msg.channel.send(embed)
    })
    
}

module.exports = covid
