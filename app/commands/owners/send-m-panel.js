const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); 
const { BOT_URL } = require('../../src/Constants.js');

module.exports = {
  name: 'send-m-panel',
  owners: true,
  execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setTitle('شراء أعضاء')
      .setDescription('**يمكنك شراء أعضاء عن طريق الضغط على الزر**')
      .setTimestamp();
    
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder() 
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('withdraw-m-balance')
        .setLabel('شراء أعضاء'), 
      new ButtonBuilder() 
        .setStyle(ButtonStyle.Link)
        .setURL(BOT_URL)
        .setLabel('إدخال البوت'));
        
    message.channel.send({ embeds: [embed], components: [row] });
    message.delete();
  },
};
