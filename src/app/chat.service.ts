import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

//const CHAT_URL = 'ws://echo.websocket.org/';
/*
export interface Message{
  sender:string,
  message:string
}
*/

@Injectable()
export class ChatService {
  messages: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }
// messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

}
