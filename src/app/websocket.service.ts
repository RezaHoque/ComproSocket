import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {
  private socket;

  constructor() { }

  private subject:Rx.Subject<MessageEvent>;
/*
  public connect(url):Rx.Subject<MessageEvent>{
    if(!this.subject){
      this.subject=this.create(url);
      console.log("Successfully connected: "+ url);
    }
    return this.subject;
  }*/
connect():Rx.Subject<MessageEvent>{
  this.socket=io("http://localhost:5000");
  let observable=new Observable(observer=>{
    this.socket.on('message',(data)=>{
      console.log("Received message from Websocket Server. ");
          observer.next(data);
    })
    return()=>{
      this.socket.disconnet();
    }
  });
  let observer = {
    next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
    },
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
