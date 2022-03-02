import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../shared/services/account.service';
import { ApiService } from '../shared/services/api.service';
import { JwtService } from '../shared/services/jwt.service';
import { Conversation } from './conversation';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection?: HubConnection;
  private messageSource = new BehaviorSubject<Message[]>([]);
  messagesSubject = this.messageSource.asObservable();
  constructor(private jwtService: JwtService, private accountService: AccountService,
    private apiService: ApiService) {
    this.accountService.currentUser.subscribe(user => {
      if (user) {
        this.connect();
      }
    });
  }
  connect() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/hubs/chat`, { accessTokenFactory: () => this.jwtService.getToken().toString() })
      .build();

    this.connection.start().then(() => {
      //console.log('connected');
    }).catch(err => console.log('Error while establishing connection'));

    this.connection.on('ReceiveMessage', (conversationId, message) => {
      console.log('ReceiveMessage', conversationId, message);
      this.messagesSubject.pipe(take(1)).subscribe(messages => {
        this.messageSource.next([...messages, { text: message, conversationId: conversationId }]);
      })
    });
  }

  sendMessage(message: any) {
    console.log('sendMessage', message);
    if (message.conversationId != undefined) {
      this.connection?.invoke('SendMessage', message.conversationId, undefined, message.message)
        .catch(err => console.error(err));
    }
    else {
      this.connection?.invoke('SendMessage', undefined, message.user, message.message)
        .catch(err => console.error(err));
    }
  }

  getConversations(): Observable<Conversation[]> {
    return this.apiService.get('/chat/conversation');
  }
}
