const usersData = require('../../src/models/Users.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'stock',
  async execute(message, args, client) {
    const usersCount = await usersData.countDocuments({ accessToken: { $exists: true } });
    const embed = new EmbedBuilder()
      .setColor('Yellow') 
      .setTitle(`المخزون الحالي هو : ${usersCount}`) 
      .setTimestamp();
    
    message.channel.send({ embeds: [embed] });
  },
};