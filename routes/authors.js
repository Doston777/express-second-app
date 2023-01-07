const express = require('express')
const router = express.Router()

const Author = require('../models/Author')

// Get authors with musics
router.get('/with_musics', (req, res) => {
  Author.aggregate(
    [
      {
        $lookup: {
          from: 'musics',
          localField: '_id',
          foreignField: 'author_id',
          as: "musics"
        }
      }
    ],
    (err, author) => {
      err ? res.json(err) : res.json(author)
    }
  )
})

// Create a new author
router.post('/', (req, res) => {
  const author = new Author(req.body).save(
    (err, author) => {
      err ? res.json(err) : res.json(author)
    }
  )
})

// Get all authors
router.get("/", (req, res) => {
  Author.find({}, (err, author) => {
    err ? res.json(err) : res.json(author)
  })
})

// Update author by id
router.put('/:id', (req, res) => {
  Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (err, author) => {
      err ? res.json(err) : res.json(author)
  })
})

// Delete author by id
router.delete('/:id', (req, res) => {
  Author.findByIdAndDelete(req.params.id, (err, author) => {
    err ? res.json(err) : res.json(author)
  })
})

module.exports = router