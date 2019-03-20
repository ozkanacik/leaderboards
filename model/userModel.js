var mongoose     = require('mongoose')
  , mongoosastic = require('mongoosastic')
  , Schema       = mongoose.Schema

var User = new Schema({
  userName: String,
  age: Number,
  sequence: Number,   
  score: Number,   
  totalMoney: Number
}, {
  versionKey: false
});
User.plugin(mongoosastic)

mongoose.model('user', User);
module.exports = mongoose.model('user');
