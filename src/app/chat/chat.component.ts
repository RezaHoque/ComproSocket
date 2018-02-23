import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ChatService } from '../chat.service';
import{ UserMessage } from '../models/UserMessage';
import { Timestamp } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { Room } from '../models/Room';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class ChatComponent implements OnInit {
  title = 'Compro Socket';
  messageText:string;
  author:string;
  um:UserMessage;
  ums:UserMessage[];
  rm:Room;
  connection:any;
  
  constructor(private chat: ChatService,private route:ActivatedRoute){ }

  ngOnInit() {
    this.rm=new Room();
    this.rm.RoomName=this.route.snapshot.params['roomname'];
    this.chat.joinRoom(this.rm);
    this.updateChat();
  }

  sendMessage() {
    this.um=new UserMessage();
    this.um.author=this.author;
    this.um.messageText=this.messageText;
    this.um.sendingDate=new Date().getDate();
    this.um.roomName=this.rm.RoomName;

    this.chat.sendMsg(this.um);

    this.messageText = "";
  }
  updateChat(){
    this.connection=this.chat.updateChat().subscribe((data)=>{
      if(data){
        console.log(data);
      }
    });
  }

}
