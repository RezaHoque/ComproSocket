var room=require('../EntityModels/Room')
var userroom=require('../EntityModels/UserRoom')

_this=this;

exports.getRooms=async function(query,page,limit){
    var options = {
        page,
        limit
    }
    try {
        var rooms = await room.paginate(query, options)
        return rooms;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating rooms');
    }
}
exports.getUsersInRoom=async function(roomName){
    try{
        console.log(roomName);
        var users=await userroom.find({roomname:roomName},function(err){});
        return users;
    }catch(e){
        throw Error('Error while fetching users from room');
    }
}