import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ChatService } from '../chat.service';
import{ UserMessage } from '../models/UserMessage';
import { Timestamp } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { Room } from '../models/Room';
import { UserRoom } from '../models/UserRoom';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class ChatComponent implements OnInit {
  title = 'Compro Socket';
  messageText:string;
  um:UserMessage;
  ums:UserMessage[];
  rm:Room;
  connection:any;
  userroom:UserRoom;
  
  constructor(private chat: ChatService,private route:ActivatedRoute){ }

  ngOnInit() {
    this.userroom=new UserRoom();
    this.userroom.roomname=this.route.snapshot.params['roomname'];
    this.userroom.nickname=localStorage.getItem("nickName");
  
    this.chat.joinRoom(this.userroom);
    this.updateChat();
    this.userAdded();
  }

  sendMessage() {
    let nickname=localStorage.getItem("nickName");
    if(nickname!=null){
      this.um=new UserMessage();
      this.um.author=nickname;
      this.um.messageText=this.messageText;
      this.um.acton_Date=new Date().getDate();
      this.um.roomName=this.userroom.roomname;
  
      this.chat.sendMsg(this.um);
  
      this.messageText = "";
    }
   
  }
  updateChat(){
    this.connection=this.chat.updateChat().map(data=>{
      return data["usermsg"] as UserMessage;
    }).subscribe(data=>{
      console.log(data.author +" wrote "+ data.messageText+ " to "+ data.roomName+ " at "+ data.acton_Date);
    });
  }
  /*
  updateChat(){
    this.connection=this.chat.updateChat().subscribe((data)=>{
      console.log(data);
      if(data){
        console.log(data.author + " wrote "+ data.messageText +" to "+ data.roomName+ " at "+data.acton_Date);
      }
    });
  }*/
  userAdded(){
    this.connection=this.chat.userAdded().subscribe((data)=>{
      if(data){
        console.log(data);
      }
    })
  }

}
