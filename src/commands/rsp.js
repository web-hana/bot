const rsp = (msg) => {

  if (msg.content.includes('안녕')) {
    msg.reply('안녕하세요!')
  } 
  
  else if (msg.content.includes('동전')) {
    const result = Math.round(Math.random());
    msg.reply(`${result ? '앞' : '뒤'}`);
  } 
  
  else if (msg.content.includes('주사위')) {
    var dice = Math.floor(Math.random() * 6) + 1;
    msg.reply('🎲 ' + dice + ' 🎲');
  } 
  
  else if (msg.content.includes('dice') || msg.content.includes('DICE')) {
    const result = Math.floor(Math.random() * 5 + 1);
    msg.reply(`${result === 1 ? "```┌─────────┐\n│         │\n│    *    │\n│         │\n└─────────┘```" : result === 2 ? "```┌─────────┐\n│ *       │\n│         │\n│       * │\n└─────────┘```" : result === 3 ? "```┌─────────┐\n│ *       │\n│    *    │\n│       * │\n└─────────┘```" : result === 4 ? "```┌─────────┐\n│ *     * │\n│         │\n│ *     * │\n└─────────┘```" : result === 5 ? "```┌─────────┐\n│ *     * │\n│    *    │\n│ *     * │\n└─────────┘```" : "```┌─────────┐\n│ *     * │\n│ *     * │\n│ *     * │\n└─────────┘```"}`);
  } 
  
  else if (msg.content.includes('제비뽑기')) {
    const users = msg.mentions.users;
    const size = users.size;

    if (size < 2) {
      msg.reply("2인 이상 언급해!")
    } else {
      const random = [...users][
        Math.round(Math.random() * (size - 1))
      ];  

      msg.channel.send(`축 당첨! <@${random[0]}>`)
    }
  } 

}
module.exports = rsp