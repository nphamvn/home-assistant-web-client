import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-converation',
  templateUrl: './converation.component.html',
  styleUrls: ['./converation.component.css']
})
export class ConverationComponent implements OnInit {
  conversations: Conversation[] = [];
  constructor(private chatService: ChatService, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.loadUserConversations();
  }
  loadUserConversations() {
    this.chatService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
    });
  }
  openConversation(conversation: Conversation) {
    this.conversationService.updateMessage(conversation);
  }
}
