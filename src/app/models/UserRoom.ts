import { DatePipe } from "@angular/common";

export class UserRoom{
    nickname:string;
    roomname:string;
    joining_date:number = Date.now();
    socket_id:string;
}