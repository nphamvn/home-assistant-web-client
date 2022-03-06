import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, map, Observable, ReplaySubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';
import { JwtService } from '../shared/services/jwt.service';
import { UuidService } from '../shared/services/uuid.service';
import { Contact } from './contact/contact';
import { Conversation } from './conversation';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection?: HubConnection;

  private newMessages = new BehaviorSubject<Message[]>([]);
  newMessagesSource = this.newMessages.asObservable();

  private pendingMessages = new ReplaySubject<Message[]>();
  pendingMessagesSubject = this.pendingMessages.asObservable();

  constructor(private jwtService: JwtService,
    private apiService: ApiService, private uuidService: UuidService) {
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

    this.connection.start()
      .then(() => { })
      .catch(err => console.log('Error while establishing connection'));

    this.connection.on('MessageSent', (message: Message) => {
      console.log('MessageSent: ' + JSON.stringify(message));

      this.newMessagesSource.pipe(take(1)).subscribe(messages => {
        const index = messages.findIndex(m => m.clientId == message.clientId);
        console.log('Index: ' + index);
        if (index == -1) {
          this.newMessages.next([...messages, message]);
        }
        else {
          this.newMessages.next([...messages.slice(0, index), message, ...messages.slice(index + 1)]);
        }
      })
    });

    this.connection.on('ReceiveMessage', (conversationId, message) => {
      this.newMessagesSource.pipe(take(1)).subscribe(messages => {
        this.newMessages.next([...messages, { Conversation: { id: conversationId }, text: message }]);
      })
    });

    this.connection.on('UserOffline', (username) => {
      //TODO: implement
    })
  }

  disconnect() {
    this.connection?.stop();
  }

  sendMessage(message: Message) {
    const msg = {
      ClientId: message.clientId,
      ConversationId: message.conversationId,
      ClientConversationId: message.Conversation?.clientId,
      Username: message.partnerUsername,
      Text: message.text
    }
    console.log('Send message to conversation: ', JSON.stringify(msg));
    this.connection?.invoke('SendMessage', msg)
      .catch(err => console.error(err))
      .finally(() => {
        this.pendingMessagesSubject.pipe(take(1)).subscribe(messages => {
          this.pendingMessages.next([...messages, message]);
        });
      });
  }

  getConversations(): Observable<Conversation[]> {
    return this.apiService.get('/chat/conversation');
  }

  getContacts(): Observable<Contact[]> {
    return this.apiService.get('/chat/contact');
  }

  getConversationMessages(conversationId: number): Observable<Message[]> {
    return this.apiService.get(`/chat/conversation/${conversationId}/messages`);
  }

  getConversation(username: string): Observable<Conversation> {
    return this.apiService.get(`/chat/conversation?participant=${username}`);
  }
}
