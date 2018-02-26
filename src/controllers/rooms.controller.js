var roomServie=require('../services/room.service');

_this=this;

exports.getRooms=async function(req,res,next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100;
    try{
    
        var rooms = await roomServie.getRooms({}, page, limit)
                
        return res.status(200).json({status: 200, data: rooms, message: "Succesfully rooms Recieved"});
        
    }catch(e){
                
        return res.status(400).json({status: 400, message: e.message});
        
    }
}