const mongoose = require('mongoose');

module.exports = new mongoose.model('Users', new mongoose.Schema({
  id: {
    required: true, 
    type: String
  }, 
  accessToken: String, 
  refreshToken: String
}));