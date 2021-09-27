import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/models';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.sass']
})
export class ChatRoomComponent implements OnInit {

  @Input() messages: Array<IMessage> = [];

  constructor() { }

  ngOnInit(): void {
    console.log('this.messages', this.messages);
  }

}
