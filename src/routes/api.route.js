var express = require('express')

var router = express.Router()
var rooms = require('./api/rooms.route')


router.use('/rooms', rooms);


module.exports = router;