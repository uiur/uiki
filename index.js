const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection

const itemSchema = mongoose.Schema({
  body: String
})

const Item = mongoose.model('Item', itemSchema)

app.use(require('body-parser').json())
app.use(express.static('public'))

const router = express.Router()

router.get('/items', (req, res) => {
  Item.find().then((items) => {
    res.json(items.map((item) => item.toObject()))
  })
})

router.post('/items', (req, res) => {
  const item = new Item(req.body)

  item.save().then(() => {
    res.json(item)
  }).catch((err) => {
    console.log(err.toString())
  })
})

router.get('/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(res.json.bind(res))
})

router.patch('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => { return Item.findById(req.params.id) })
    .then(res.json.bind(res))
})

app.use('/api', router)

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

db.once('open', () => {
  app.listen(3000)
})
