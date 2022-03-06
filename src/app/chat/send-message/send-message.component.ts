import { Component, Input, OnInit } from '@angular/core';
import { UuidService } from 'src/app/shared/services/uuid.service';
import { ChatService } from '../chat.service';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { Message } from '../message';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  conversation?: Conversation;
  sendText = '';
  constructor(private chatService: ChatService,
    private conversationService: ConversationService,
    private uuidService: UuidService) {
    this.conversationService.conversationSubject.subscribe(conversation => {
      this.conversation = conversation;
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.conversation) {
      let message: Message = {
        text: this.sendText,
        clientId: this.uuidService.generateUuid(),
      }
      if (this.conversation.id == undefined) {
        this.conversation.clientId = this.uuidService.generateUuid();
        message.clientConversationId = this.conversation.clientId;
        message.partnerUsername = this.conversation.Contact?.username;
      }
      else {
        message.conversationId = this.conversation.id;
      }

      this.chatService.sendMessage(message);
      this.sendText = '';
    }
  }
}
