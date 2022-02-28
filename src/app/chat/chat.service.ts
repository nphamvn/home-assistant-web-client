import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../shared/services/account.service';
import { JwtService } from '../shared/services/jwt.service';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection?: HubConnection;
  private messageSource = new BehaviorSubject<Message[]>([]);
  messagesSubject = this.messageSource.asObservable();
  constructor(private jwtService: JwtService, private accountService: AccountService) {
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

    this.connection.on('ReceiveMessage', (user, message) => {
      console.log('ReceiveMessage', user, message);
      this.messagesSubject.pipe(take(1)).subscribe(messages => {
        this.messageSource.next([...messages, { text: message, author: user }]);
      })
    });
  }

  sendMessage(message: any) {
    console.log('sendMessage', message);
    this.connection?.invoke('SendMessage', message.user, message.message)
      .catch(err => console.error(err));
  }
}
