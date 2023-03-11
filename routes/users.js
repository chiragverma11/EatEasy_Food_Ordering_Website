const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('index.ejs', { title: 'EatEasy' })
})

module.exports = router
