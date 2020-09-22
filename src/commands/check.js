const { save, load } = require('../utils')

const check = (msg) => {
    const data = load('data/attendance.json')

    const date = new Date()
    const today = date.getFullYear().toString() + (date.getMonth() + 1) + date.getDate()
    var attRate = data[msg.author.id] ? data[msg.author.id].attRate : 0;

    if (data[msg.author.id] && data[msg.author.id].date == today) {
        msg.reply(`이미 출석이 된 상태입니다. (${today})`)            //이미 출석이 된 상태입니다.
    } else {                                                                          //그렇지 않은 경우
        data[msg.author.id] = {                                                       //값을 저장(id가 메인. 출석수와, 날짜를)
            attRate: attRate++,
            date: today,
        }
        msg.reply(`출석이 완료되었습니다. (${today})`)                         //확인문구 출력
        save('data/attendance.json', data)                                             //이를 데이터에 저장
    }
}

module.exports = check