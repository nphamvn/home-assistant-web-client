import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/shared/services/account.service';
import { ChatService } from '../chat.service';
import { ChatUser } from '../chatContact';
import { Conversation } from '../conversation';
import { Message } from '../message';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  contacts: ChatUser[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
}
