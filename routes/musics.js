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

// Get music by id
router.get("/:id", (req, res) => {
  Music.findById(req.params.id, (err, music) => {
    err ? res.status(404) : res.status(200).json(music)
  })
})

// Update music by id
router.put("/:id", (req, res) => {
  Music.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (err, music) => {
      err ? res.json(err) : res.status(204).json(music)
    }
  )
})

// Delete music by id
router.delete("/:id", (req, res) => {
  Music.findByIdAndDelete(req.params.id, (err, music) => {
    err ? res.json(err) : res.json(music)
  })
})

// Get all users
router.get("/", (req, res, next) => {
  Music.find({}, (err, music) => {
    err ? res.status(404) : res.status(200).json(music)
  })
})


module.exports = router