const express = require("express")
const router = express.Router()

const Music = require("../models/Music")

// Get musics between two years
router.get("/between/:start_date/:end_date", (req, res) => {
  const { start_date, end_date } = req.params
  Music.find(
    {
      year: {
        $gte: parseInt(start_date),
        $lte: parseInt(end_date)
      }
    },
    (err, music) => {
      err ? res.json(err) : res.json(music)
    }
  )
})

// Get get top 3 musics by spotify_score
router.get("/top3", (req, res) => {
  const promise = Music.find({}).sort({spotify_score: -1}).limit(3)
  promise.then(musics => res.json(musics))
    .catch(err => res.json(err)) 
})



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
      err ? res.json(err) : res.json(music)
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