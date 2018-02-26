import { DatePipe } from "@angular/common";

export class UserRoom{
    nickname:string;
    roomname:string;
    action_date:number = Date.now();
}