const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); 

module.exports = {
  name: 'send-b-panel',
  owners: true,
  execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setTitle('شراء رصيد')
      .setDescription('**يمكنك شراء رصيد عن طريق الضغط على الزر**')
      .setTimestamp();
    
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder() 
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('buy-balance')
      .setLabel('شراء رصيد'));
    
    message.channel.send({ embeds: [embed], components: [row] });
    message.delete();
  },
};
