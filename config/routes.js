const express = require('express')
const router = express.Router()
var array = [{'id': 1, 'name': 'Chewing Gum', 'color': 'Red'}, {'id': 2, 'name': 'Pez', 'color': 'Green'}, {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'}, {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}]
var newCandy = {
  name: '',
  color: ''
}

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// index
router.get('/', (req, res) => {
  res.status(200).json(array)
})

// show
router.get('/:id', (req, res) => {
  res.status(200).json(array[req.params.id])
})

// create
router.post('/', (req, res) => {
  if (req.body.color === 'haha') {
    res.status(422).json('Invalid Color')
  }
  newCandy.name = req.body.name
  newCandy.color = req.body.color
  array.push(newCandy)
  newCandy = {}
  res.status(201).json(array)
})

// update
router.put('/:id', (req, res) => {
  array[req.params.id].name = req.body.name
  array[req.params.id].color = req.body.color
  res.status(200).json(array[req.params.id])
})

// delete
router.delete('/:id', (req, res) => {
  array.splice(req.params.id, 1)
  res.status(201).json(array)
})

module.exports = router

// json [{"id":1,"name":"Chewing Gum","color":"Red"},{"id":2,"name":"Pez","color":"Green"},{"id":3,"name":"Marshmallow","color":"Pink"},{"id":4,"name":"Candy Stick","color":"Blue"}]
