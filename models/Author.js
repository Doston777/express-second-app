const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorsSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3
  },
  surname: {
    type: String,
    maxlength: 30
  },
  bio: {
    type: String,
    maxlength: 160,
    minlength: 4
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }

})

module.exports = mongoose.model('author', AuthorsSchema)