import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Room } from './models/Room';

@Injectable()
export class WebsocketService {
  private socket;

  constructor() { 
    this.socket=io("http://localhost:5000");
  }

  private subject:Rx.Subject<MessageEvent>;
joinRoom(data){
  this.socket.emit('start', JSON.stringify(data));
}

connect():Rx.Subject<MessageEvent>{
  
  
 
  let observable=new Observable(observer=>{
    this.socket.on('message',(data)=>{
      console.log("Received message from Websocket Server. ");
      observer.next(data);

    });
    this.socket.on('start',(room)=>{
      console.log("Received room from Websocket Server. "+ room);
      observer.next(room);
    });
    return()=>{
      this.socket.disconnet();
    }
   
  });
  let observer = {
    next: (data: Object) => {
      
      this.socket.emit('message', JSON.stringify(data));
   
    }
  };
  return Rx.Subject.create(observer, observable);

}
/*
private create(url):Rx.Subject<MessageEvent>{
    let ws=new WebSocket(url);

    let observable=Rx.Observable.create(
      (obs:Rx.Observer<MessageEvent>)=>{
        ws.onmessage=obs.next.bind(obs);
        ws.onerror=obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
      
        return ws.close.bind(ws);

      })

      let observer={
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      }
      return Rx.Subject.create(observer, observable);
  }
*/
}
