import { Component, OnInit } from '@angular/core';
import { ChatUser } from '../chatContact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: ChatUser[] = [];
  constructor() { }

  ngOnInit(): void {
    // this.chatService.getContacts().subscribe(contacts => {
    //   this.contacts = contacts;
    // });
  }

}
