const express = require("express")
const router = express.Router()

const Music = require("../models/Music")

// create new music
router.post('/', (req, res) => {
  const music = new Music(req.body)
  music.save((err,music) => {
    err ?
      res.status(
        err.name === 'ValidationError' ? 403 : 500
      ).json(err) : res.status(201).json(music) 
  })
})

/* GET users listing. */
router.get("/", (req, res, next) => {
  Music.find({}, (err, music) => {
    err ? res.status(err.name) : res.status(200).json(music)
  })
})

module.exports = router