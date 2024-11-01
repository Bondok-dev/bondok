const express = require('express');
const app = express();

module.exports = {
  name: 'ready',
  execute(client) {
    /*const guilds = client.guilds.cache.filter((guild) => guild.id !== '1178692921613103146');
    
    guilds.forEach((guild) => {
      guild.leave();
    });*/
    app.listen(3000);
    console.log(`${client.user.username} Is Online !`);
  },
};