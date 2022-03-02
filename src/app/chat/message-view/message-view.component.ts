import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Contact } from '../contact/contact';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { Message } from '../message';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  _conversation: Conversation | undefined;
  // @Input()
  // set conversation(conversation: Conversation) {
  //   console.log('MessageViewComponent.conversation');
  //   this._conversation = conversation;
  //   this.loadMessages();
  // }
  //@Input() conversation: Conversation | undefined;
  @Input() contact: Contact | undefined;
  messages: Message[] = [];
  sendText = '';
  constructor(private chatService: ChatService, private conversationService: ConversationService) {
    console.log('MessageViewComponent.constructor');
    conversationService.getMessage().subscribe(message => {
      this._conversation = message;
      this.loadMessages();
    });
  }

  ngOnInit(): void {
  }

  loadMessages() {
    if (this._conversation) {
      this.chatService.getConversationMessages(this._conversation.id).subscribe(messages => {
        this.messages = messages;
      })
    }
  }

  sendMessage() {
    if (this._conversation) {
      this.chatService.sendMessage({ conversationId: this._conversation.id, message: this.sendText });
    } else if (this.contact) {
      this.chatService.sendMessage({ username: this.contact.userName, message: this.sendText });
      //this.conversation = new Conversation();
      //this.chatService.sendMessage(this.contact.userName, this.contact.userName, this.contact.userName, this.contact.userName, this.contact.userName);
    }
    this.messages.push({ id: 1, text: this.sendText });
    this.sendText = '';
  }
}
