var express = require('express')

var router = express.Router()

var roomsController = require('../../controllers/rooms.controller');
router.get("/",roomsController.getRooms)
router.get("/:roomname",roomsController.getUsersInRoom)

module.exports=router;