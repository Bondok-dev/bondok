const mongoose = require('mongoose');

module.exports = new mongoose.model('Users', new mongoose.Schema({
  id: {
    required: true, 
    type: String
  }, 
  balance: {
    type: Number, 
    default: 0
  }, 
  accessToken: String, 
  refreshToken: String
}));