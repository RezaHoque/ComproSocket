let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

      // Log whenever a user connects
    socket.on("new_user",function(data){
        
        socket.join(data.Room.RoomName,function(){
            console.log("a new user just joind the room: "+ data.Room.RoomName);
        });

    });
    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });
   
    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        
        console.log("Message Received at: " + message.msg.roomName+ "Message: "+message.msg.messageText);
        io.to(message.msg.roomName).emit('message_created', {type:'new-message', message});    
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});