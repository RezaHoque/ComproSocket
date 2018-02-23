import { Time } from "@angular/common";

export class UserMessage{
    socketId:string;
    author:string;
    messageText:string;
    sendingDate:number;
    sendingTime:Time;
    roomName:string;
    
}