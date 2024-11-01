const { CLIENT_ID, REDIRECT_URI, CHANNEL, AUTH_URL } = require('./src/Constants.js');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const usersData = require('./src/models/Users.js');

process.on('unhandledRejection', (err) => console.error(err));
           
mongoose.connection.on('connected', () => console.log('Connected to database !'));
mongoose.connect(process.env.MONGO_URL);

app.get('/callback/login', async (req, res) => {
  let response;
  let access_token;
  let refresh_token;
  const { code } = req.query;

  if (code) {
    try {
      response = await axios.post('https://discord.com/api/oauth2/token', {
        client_id: CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        scope: 'identify'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      access_token = response.data.access_token;
      refresh_token = response.data.refresh_token;

      response = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `${response.data.token_type} ${access_token}`
        }
      });
    } catch (err) {
      return res.send(err.response?.data?.error_description || 'Unknown Error');
    }

    const userData = await usersData.findOne({
      id: response.data.id
    }) || new usersData({
      id: response.data.id,
    });

    userData.accessToken = access_token;
    userData.refreshToken = refresh_token;

    await userData.save();
    
    const count = await usersData.countDocuments({ accessToken: { $exists: true } });

    res.send('تم بنجاح .. يمكنك اغلاق هذه الصفحة');
  } else {
    res.redirect(AUTH_URL);
  }
});

app.listen(3000, () => console.log('App started...'));