const info = require('../utils/translate.json')

const translate = async (msg, embed) => {
    const request = require('request')
    const client_id = 'cUX0eZ2ntKUFeHRBTAQa'
    const client_secret = 'GpJv5FPGEB'
    let translate_langCode

    const args = msg.content.split(" ")
    let query = args[2]

    for(let i=3;i<args.length;i++){
        query = query + " " + args[i]
    }
    
    async function getLangCode() {
        const api_url1 = 'https://openapi.naver.com/v1/papago/detectLangs'
        const options1 = {
            url: api_url1,
            form: {'query': query},
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        }
        request.post(options1, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                translate_langCode = JSON.parse(body).langCode
            } else {
                msg.channel.send('번역할 문장의 언어를 감지할 수 없습니다')
            }
        })
    }

    async function translated() {
        if(translate_langCode != undefined && translate_langCode != null){
            const target = args[1]
            const api_url = 'https://openapi.naver.com/v1/papago/n2mt'
            const options = {
                url: api_url,
                form: {'source': translate_langCode, 'target': target, 'text': query},
                headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
            }
            request.post(options, function(err, response, body){
                if(!err && response.statusCode == 200){
                    msg.channel.send(JSON.parse(body).message.result.translatedText)
                }else{
                    msg.channel.send('번역에 실패하였습니다')
                }
            })
        }else{
            msg.channel.send('번역에 실패하였습니다')
        }
    }

    if(args[1] === 'info'){
        let string = ""

        for(let i=0;i<info.length; i++){
            string += info[i].source + " 👉 " + info[i].target +"\n"
        }
        embed.setTitle('info!')
            .setDescription(string)
        msg.channel.send(embed)
    }else{
        await getLangCode()
        setTimeout(function() {translated()}, 500) 
    }

    
    
}

module.exports = translate
  