const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'EatEasy' })
})

module.exports = router
