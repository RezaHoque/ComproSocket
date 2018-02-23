import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { Room } from './models/Room';
import { ROOMS } from './models/mock-rooms';
import { of } from 'rxjs/observable/of';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { UserMessage } from './models/UserMessage';

@Injectable()
export class ChatService {

  private socket;
  private host="http://localhost:5000";
 
  constructor() {
    this.socket=io(this.host);
   }

  sendMsg(msg) {
    this.socket.emit("message",{msg});
  }
 joinRoom(data){
   this.socket.emit("new_user",{Room:data});
 }
  getRooms():Observable<Room[]>{
    return of(ROOMS);
  }
  updateChat() {
    let observable = new Observable<UserMessage>(observer => {
        this.socket.on('message_created', (data) => {
            observer.next(data);
        });
    });

    return observable;
}

}
