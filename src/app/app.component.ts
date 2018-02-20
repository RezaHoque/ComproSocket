import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {
  title = 'Compro Socket';
  messageText:string;
  constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + "Sender: "+ msg.sender +" Message: "+msg.message);
		});
  }
  
  private message = {
		sender: 'Reza',
		message: 'this is a test message'
	}

  sendMsg() {
    this.message.message=this.messageText;
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}
}
