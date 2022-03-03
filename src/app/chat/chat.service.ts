import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { AccountService } from '../shared/services/account.service';
import { ApiService } from '../shared/services/api.service';
import { JwtService } from '../shared/services/jwt.service';
import { ChatUser as ChatContact } from './chatContact';
import { Conversation } from './conversation';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection?: HubConnection;
  private messagesSource = new BehaviorSubject<Message[]>([]);
  messagesSubject = this.messagesSource.asObservable();

  private messageSource = new ReplaySubject<Message>();
  messageSubject = this.messageSource.asObservable();

  constructor(private jwtService: JwtService,
    private apiService: ApiService) {
    jwtService.currentTokenSubject.subscribe(token => {
      if (token) {
        this.connect();
      }
      else {
        this.disconnect();
      }
    });
  }
  connect() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/hubs/chat`, { accessTokenFactory: () => this.jwtService.getToken() })
      .build();

    this.connection.start().then(() => {
    }).catch(err => console.log('Error while establishing connection'));

    this.connection.on('ReceiveMessage', (conversationId, message) => {
      this.messageSource.next({ conversationId: conversationId, text: message });
      this.messagesSubject.pipe(take(1)).subscribe(messages => {
        this.messagesSource.next([...messages, { text: message, conversationId: conversationId }]);
      })
    });
    this.connection.on('UserOffline', (username) => {
      //TODO: implement
      this.messageSource.next({ text: `${username} is offline` });
    })
  }

  disconnect() {
    this.connection?.stop();
  }

  sendMessage(message: any) {

    if (message.conversationId != undefined) {
      console.log('sendMessage: conversationId', message.conversationId);
      this.connection?.invoke('SendMessage', message.conversationId, undefined, message.message)
        .catch(err => console.error(err));
    }
    else {
      console.log('sendMessage: username', message.username);
      this.connection?.invoke('SendMessage', undefined, message.username, message.message)
        .catch(err => console.error(err));
    }
  }

  getConversations(): Observable<Conversation[]> {
    return this.apiService.get('/chat/conversation');
  }

  getContacts(): Observable<ChatContact[]> {
    return this.apiService.get('/chat/contact');
  }

  getConversationMessages(conversationId: number): Observable<Message[]> {
    return this.apiService.get(`/chat/message?conversationId=${conversationId}`);
  }
}
