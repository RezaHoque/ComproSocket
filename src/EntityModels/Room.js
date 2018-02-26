var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var RoomSchema=new mongoose.Schema({
    title:String,
    author:String,
    action_date:{type:Date,default:Date.now}
});

RoomSchema.plugin(mongoosePaginate);
var room=mongoose.model("Rooms",RoomSchema);
module.exports=room;