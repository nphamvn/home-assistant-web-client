import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { ChatService } from '../chat.service';
import { Message } from '../message';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  me = 'me';
  sendText = '';
  to = '';
  messages: Message[] = [];
  constructor(private chatService: ChatService, private accountService: AccountService) {
    accountService.currentUser.subscribe(user => {
      if (user) {
        this.me = user.username;
      }
    });

    chatService.messagesSubject.subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnInit(): void {
  }
  sendMessage() {
    this.chatService.sendMessage({ user: this.to, message: this.sendText });
    this.messages.push({ id: 1, text: this.sendText, author: this.me });
    this.sendText = '';
  }
}
