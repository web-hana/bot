is_start = 0
count= 0

const baseball = (msg, embed) =>{

    if(msg.content.includes('시작')){
        answer=setNumber()
        console.log(answer)
        msg.channel.send('좋아 숫자를 생각해써 맞춰봐')
        is_start=1
    }

    if(is_start==1){
        input = msg.content.split(' ')
        rep = input.length-1
        if(!isNaN(Number(input[rep])) && input[rep].length ==4 ){
            console.log('안전하게 들어왔다')
            count++
            console.log(input[rep])
            result = compare(input[rep])

            if(result[0]==4){
                msg.channel.send('홈런이야 너 짱이다 ㅠㅠ' +count+'번만에 맞췄어!!')
                count=0
                is_start=0
            }
            else if(count==10){
                msg.channel.send('아웃이야...정답은 '+input[rep]+'였어 다시 시도해봐!')
                count=0
                is_start=0
            }
            else{
            msg.channel.send('스트라이크 '+result[0]+'개, 볼 '+result[1]+'개다. '+(10-count)+'번 남았어~!')
            console.log(count)
            }
        }else if(msg.content.includes('포기')){
            is_start=0
            msg.channel.send('자신 있을 때 또 와,,,')
        }
    }
    else if(msg.content.includes('방법')|| msg.content.includes('어떻게')){
        embed.setTitle('방법!')
            .setDescription('내가 생각하는 숫자를 맞춰봐\n숫자는 맞지만 위치가 틀렸을 때는 볼\n숫자와 위치가 전부 맞으면 스트라이크.\n중복숫자는 없어용\n기회는 10번 알겠으면 시작해줘~')
        msg.channel.send(embed)
    }
    
    else{
        msg.channel.send('야구를 시작해줘 방법을 모르면 물어봐~')

    }
    
}

    
function setNumber() {
    list = [0,1,2,3,4,5,6,7,8,9]
    number = []
    for (var i = 0; i < 4; i++){
    
        var select = Math.floor(Math.random() * list.length) // 랜덤한 값을 찾는것.
        number[i] = list.splice(select, 1)[0]
    }
    return number;
}

function compare(myrep){
    SB = [0, 0]
    for (var i = 0; i<4; i++){
        for (var j =0; j<4; j++){
            if(answer[i] ==myrep[j]){
                if(i == j){
                    SB[0]+=1;
                }else{
                    SB[1]+=1;
                }
            }
        }
    }
    return SB;
}

module.exports = baseball