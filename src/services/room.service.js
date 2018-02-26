var room=require('../EntityModels/Room')
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