const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MusicSchema = new Schema({
  author_id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  country: String,
  year: Number,
  spotify_score: Number,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('music', MusicSchema)