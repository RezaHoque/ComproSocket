import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Room } from '../models/Room';
import { WebsocketService } from '../websocket.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class DashboardComponent implements OnInit {
rooms:Room[];
nickName:string;
roomName:string;
  constructor(private chatService: ChatService,private router:Router,private http: HttpClient) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms():void{
    //this.chatService.getRooms().subscribe(rooms=>this.rooms=rooms);
    this.chatService.getRooms().subscribe(data=>{
      this.rooms=data;
    });
  }
  login(){
    let nickname=this.nickName;
    let roomname=this.roomName;
    localStorage.setItem("nickName",nickname);
    this.router.navigate(["/chat",  roomname]);
  }

}
