import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Conversation } from './conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private conversation = new ReplaySubject<Conversation>();

  conversationSubject = this.conversation.asObservable();

  constructor() { }

  public openConversation(conversation: Conversation): void {
    this.conversation.next(conversation);
  }
}
