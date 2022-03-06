import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { Message } from '../message';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  conversation: Conversation | undefined;
  messages: Message[] = [];
  sendText = '';

  constructor(private chatService: ChatService, conversationService: ConversationService) {
    conversationService.conversationSubject.subscribe(conversation => {
      this.conversation = conversation;
      if (conversation.id != undefined) {
        console.log('Loading messages with conversation id ' + conversation.id);
        this.loadMessages();
      }
      else if (conversation.Contact != undefined) {
        //Check if conversation exists
        this.chatService.getConversation(conversation.Contact.username).subscribe(c => {
          if (c) {
            this.conversation = c;
            this.loadMessages();
          }
          else {
            // Don't create new conversation here because user may not want to create a new conversation. 
            // He may just want to check if there is a conversation with the user.
            console.log('No conversation with user: ' + conversation.Contact?.username);
          }
        });
      }
    }
    );

    chatService.newMessagesSource.subscribe(messages => {
      if (this.conversation?.id) {
        const newMessages = messages.filter(m => m.conversationId == this.conversation?.id && m.id == undefined);
        this.messages = this.messages.concat(newMessages);
      }
    }
    );
  }

  ngOnInit(): void {
  }

  loadMessages() {
    if (this.conversation?.id) {
      this.chatService.getConversationMessages(this.conversation.id).subscribe(messages => {
        this.messages = messages;
      })
    }
  }
}
