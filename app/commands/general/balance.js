const usersData = require('../../src/models/Users.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'balance', 
  async execute(message, args, client) {
    const user = args[0] ? client.users.cache.get(args[0]?.toId()) : message.author;
    
    if (!user) return message.lineReplyNoMention('❌ **هذا المستخدم غير موجود!**');
    if (user.bot) return message.lineReplyNoMention('❌ **البوتات لا تملك ارصدة!**');
    
    const userData = await usersData.findOne({ id: user.id }) || new usersData({ id: user.id });
    const embed = new EmbedBuilder()
      .setColor('Yellow')
      .setTitle(user.id === message.author.id ? `**رصيدك الحالي هو : ${userData.balance}**` : `**رصيد ${user.username} الحالي هو : ${userData.balance}**`)
      .setTimestamp();
    
    message.lineReplyNoMention({ embeds: [embed] });
  },
};