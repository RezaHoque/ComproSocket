var mongoose=require('mongoose');

var UserMessageSchema=new mongoose.Schema({
    socketId:String,
    author:String,
    messageText:String,
    action_date:{type:Date,default:Date.now},
    roomName:String
    
});
var usermessage=mongoose.model("UserMessages",UserMessageSchema);
module.exports=usermessage;