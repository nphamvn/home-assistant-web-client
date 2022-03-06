import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Conversation } from '../conversation';
import { ConversationService } from '../conversation.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private chatService: ChatService, private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.chatService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }
  openConversation(contact: Contact) {
    console.log('Open chat view for contact: ', JSON.stringify(contact));
    this.conversationService.openConversation({ Contact: contact });
  }
}
