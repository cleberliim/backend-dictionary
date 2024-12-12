const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

const Word = mongoose.model('Word', WordSchema);
module.exports = Word;
