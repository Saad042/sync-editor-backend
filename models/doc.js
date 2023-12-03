const mongoose = require('mongoose');

const { Schema } = mongoose;

const docSchema = new Schema({
  dialogue: Schema.Types.String,
  mood: Schema.Types.String,
});

module.exports = mongoose.model('Doc', docSchema);
