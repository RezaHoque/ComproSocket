var mongoose=require('mongoose');
//var router = express.Router();

var UserRoomSchema=new mongoose.Schema({
    nickname:String,
    roomname:String,
    joining_date:{type:Date,default:Date.now}
});

var userroom=mongoose.model("UserRooms",UserRoomSchema);
module.exports=userroom;
