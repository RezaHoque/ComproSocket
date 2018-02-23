import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Room } from '../models/Room';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class DashboardComponent implements OnInit {
rooms: Room[]=[];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms():void{
    this.chatService.getRooms().subscribe(rooms=>this.rooms=rooms);
  }

}
