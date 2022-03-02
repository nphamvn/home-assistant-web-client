import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Conversation } from './conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private siblingMsg = new Subject<Conversation>();

  constructor() { }

  public getMessage(): Observable<Conversation> {
    return this.siblingMsg.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: Conversation): void {
    this.siblingMsg.next(message);
  }
}
