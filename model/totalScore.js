var mongoose     = require('mongoose')
  , Schema       = mongoose.Schema

var Score = new Schema({
    week:Number,
    score:Number,
    state:Number
}, {
  versionKey: false
});

mongoose.model('score', Score);
module.exports = mongoose.model('score');
