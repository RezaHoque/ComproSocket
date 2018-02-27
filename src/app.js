let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose=require('mongoose');
let bluebird = require('bluebird');
let room=require('./EntityModels/Room');
let user_room=require('./EntityModels/UserRoom');
let user_msg=require('./EntityModels/UserMessage');
var api = require('./routes/api.route');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  app.use('/api', api);

  //connecting to database
mongoose.Promise=bluebird;
mongoose.connect("mongodb://localhost:27017/comprosocket")
.then(()=>{console.log("connected to mongoDB databse")})
.catch(()=>{console.log("error connecting to mongoDB database")});
/*
var rm=new room({title:"Tech",author:"Admin"});
rm.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(rm);

});
*/
io.on('connection', (socket) => {

    // Log whenever a user connects
    socket.on("new_user",function(data){
        console.log(data);
        socket.join(data.userroom.roomname,function(){
            
            var userroom=new user_room({
                nickname:data.userroom.nickname,
                roomname:data.userroom.roomname,
                socket_id:socket.id
            });
            userroom.save(function(){
                console.log(userroom.nickname +" just joind the room: "+ userroom.roomname);
            });
        });

        socket.broadcast.emit("user_joined",data);

    });
    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('a user disconnected');
        //on disconnect, delete the user from the table.
        user_room.deleteMany({socket_id:socket.id},function(err){});
                
    });
   
    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        
        console.log("Message Received at: " + message.msg.roomName+ "Message: "+message.msg.messageText);
        //io.to(message.msg.roomName).emit('message_created', {message});  
        
        var usermsg=new user_msg({
            author:message.msg.author,
            messageText:message.msg.messageText,
            roomName:message.msg.roomName
        });
        usermsg.save(function(){
            console.log(usermsg);
        });
        io.sockets.in(usermsg.roomName).emit('message_created', {usermsg});  
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});