import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import{ UserMessage } from './models/UserMessage';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent implements OnInit{
  title = 'Compro Socket';
  messageText:string;
  author:string;
  public um:UserMessage;

  constructor(private chat: ChatService){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      /*
      let span = document.createElement('span');
      let brk = document.createElement('br');
      span.textContent = msg.text;
      span.appendChild(brk);
      document.body.appendChild(span);
      */
      console.log(msg);

    })
  }

  sendMessage() {
    this.um=new UserMessage();
    this.um.author=this.author;
    this.um.messageText=this.messageText;
    this.um.sendingDate=new Date().getDate();

    this.chat.sendMsg(this.um);

    this.messageText = "";
  }
}
