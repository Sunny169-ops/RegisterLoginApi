const express = require('express')

const router = express.Router()

const {register,login} = require('../controller/registerController')

router.post('/adduser', register)
router.post('/getuser', login)

module.exports = router;