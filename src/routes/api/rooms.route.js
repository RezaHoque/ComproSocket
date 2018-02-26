var express = require('express')

var router = express.Router()

var roomsController = require('../../controllers/rooms.controller');
router.get("/",roomsController.getRooms)

module.exports=router;