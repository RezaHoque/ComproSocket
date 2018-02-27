import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Room } from './models/Room';

import { of } from 'rxjs/observable/of';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { UserMessage } from './models/UserMessage';
import { HttpClient } from '@angular/common/http';
import { UserRoom } from './models/UserRoom';

@Injectable()
export class ChatService {

  private socket;
  private host="http://localhost:5000";
  private roomEndpoint=this.host+"/api/rooms";
 
  constructor(private http:HttpClient) {
    this.socket=io(this.host);
   }

  sendMsg(msg) {
    this.socket.emit("message",{msg});
  }
 joinRoom(data){
   this.socket.emit("new_user",{userroom:data});
   //this.socket.emit("user_joined",)
 }
  getRooms():Observable<Room[]>{
    return this.http.get(this.roomEndpoint)
    .map(res  => {
      //Maps the response object sent from the server       
      return res["data"].docs as Room[];
    })
  }
  updateChat() {
    let observable = new Observable<UserMessage>(observer => {
        this.socket.on('message_created', (data) => {
            observer.next(data);
        });
    });

    return observable;
}
userAdded(){
  let observable=new Observable<any>(observer=>{
    this.socket.on("user_joined",(data)=>{
      observer.next(data);
    });
  });
  return observable;
}

getUsersInRoom(roomname):Observable<UserRoom[]>{
  return this.http.get(this.roomEndpoint +"/"+ roomname)
  .map(res=> {
  return res["data"] as UserRoom[];
})
}

}
